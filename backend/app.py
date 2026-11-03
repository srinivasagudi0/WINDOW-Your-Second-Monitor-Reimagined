import os
import uuid
import base64
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from openai import OpenAI

ROOT = Path(__file__).resolve().parent.parent

app = Flask(
    __name__,
    static_folder=str(ROOT),
    static_url_path=""
)

# Keep CORS restricted to the deployed static frontend. Set ALLOWED_ORIGIN in
# Render to the exact Vercel URL (including https:// and no trailing slash).
allowed_origin = os.getenv("ALLOWED_ORIGIN", "http://localhost:8000")
CORS(app, resources={r"/generate": {"origins": allowed_origin}})

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

        width = int(data.get("width", 1920))
        height = int(data.get("height", 1080))
        aspect_ratio = width / max(height, 1)
        if aspect_ratio > 1.2:
            image_size = "1536x1024"
        elif aspect_ratio < 0.8:
            image_size = "1024x1536"
        else:
            image_size = "1024x1024"

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
        Just for info, it is {time.strftime('%Y-%m-%d %H:%M:%S')} now.
        """
        result = client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size=image_size,
            quality="medium"
        )
        image_bytes = base64.b64decode(
            result.data[0].b64_json
        )
        filename = f"{uuid.uuid4().hex}.png"
        filepath = OUTPUT_DIR / filename
        filepath.write_bytes(image_bytes)

        backend_url = os.getenv("BACKEND_PUBLIC_URL", request.url_root.rstrip("/"))
        return jsonify({
            "success": True,
            "image_url": f"{backend_url}/assets/generated/{filename}"
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
