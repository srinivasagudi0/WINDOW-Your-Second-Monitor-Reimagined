import os
import uuid
import base64
from pathlib import Path
from flask import Flask, request, jsonify
from openai import OpenAI

ROOT = Path(__file__).resolve().parent.parent

app = Flask(
    __name__,
    static_folder=str(ROOT),
    static_url_path=""
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

OUTPUT_DIR = ROOT / "assets" / "generated"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

@app.route("/")
def home():
    return app.send_static_file("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json(silent=True) or {}

        scenery = str(data.get("scenery", "mountains"))[:60]
        time = str(data.get("time", "evening"))[:60]
        weather = str(data.get("weather", "sunny"))[:60]

        prompt = f"""
        Create a photorealistic cinematic landscape.

        Scenery: {scenery}
        Time of day: {time}
        Weather: {weather}

        Wide landscape composition.
        Natural realistic lighting.
        Beautiful immersive environment.
        Fixed camera perspective.
        No people, no text, no window frame.
        """
        result = client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size="1536x1024",
            quality="medium"
        )
        image_bytes = base64.b64decode(
            result.data[0].b64_json
        )
        filename = f"{uuid.uuid4().hex}.png"
        filepath = OUTPUT_DIR / filename
        filepath.write_bytes(image_bytes)

        return jsonify({
            "success": True,
            "image_url": f"/assets/generated/{filename}"
        })

    except Exception:
        app.logger.exception("Image generation failed")

        return jsonify({
            "success": False,
            "error": "Image generation failed. Check the Python terminal."
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )