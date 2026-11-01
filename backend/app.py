import os
from openai import OpenAI
from flask import Flask, request, jsonify

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    scenery = data.get("scenery", "mountains")
    time = data.get("time", "sunset")
    weather = data = data.get("weather", "clear")

    prompt = f"""
        Photorealistic cinematic landscape of {scenery} during {time} with {weather} weather. Wide landscape realistic lighting, no people, no text, no window frame.
    """

    result = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size="1536x1024",
        quality="medium"
    )
