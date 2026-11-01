import os
from openai import OpenAI
from flask import Flask, request, jsonify

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))