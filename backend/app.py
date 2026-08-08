from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("waste_model_clean.keras", compile=False)

with open("labels.txt", "r", encoding="utf-8") as f:
    class_names = [line.strip() for line in f.readlines()]

def prepare_image(image):
    image = image.convert("RGB")
    image = image.resize((224, 224))
    img = np.array(image, dtype=np.float32)
    img = np.expand_dims(img, axis=0)
    return img
@app.route("/")
def home():
    return "Flask backend is running"
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image = Image.open(file.stream)

    img = prepare_image(image)
    preds = model.predict(img, verbose=0)

    pred_index = int(np.argmax(preds[0]))
    confidence = float(np.max(preds[0]))

    return jsonify({
        "predicted_class": class_names[pred_index],
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True)