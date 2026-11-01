import os
from openai import OpenAI
from flask import Flask, request, jsonify
import base64
import uuid
from pathlib import Path

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    scenery = data.get("scenery", "mountains")
    time = data.get("time", "sunset")
    weather = data.get("weather", "clear")

    prompt = f"""
        Photorealistic cinematic landscape of {scenery} during {time} with {weather} weather. Wide landscape realistic lighting, no people, no text, no window frame.
    """

    result = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size="1536x1024",
        quality="medium"
    )
    project_root = Path(__file__).resolve().parent.parent
    output_dir = project_root / "assets" / "generated"
    output_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid.uuid4().hex}.png"
    image_bytes = base64.b64decode(result.data[0].b64_json)
    (output_dir / filename).write_bytes(image_bytes)

    return jsonify({"image_url": f"/assets/generated/{filename}"})


if __name__ == "__main__":
    app.run()