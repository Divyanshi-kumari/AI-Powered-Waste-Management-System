# ♻️ AI-Powered Waste Management System

An AI-powered web application that uses Deep Learning and Computer Vision to classify different types of waste from images and assist with waste segregation.

The system combines a React frontend, Flask backend, and a MobileNetV2-based deep learning model to provide real-time waste classification.

---

## 🌱 Overview

Improper waste segregation is a major challenge in effective waste management.

This project aims to make waste classification easier by using Artificial Intelligence to identify waste categories from uploaded or captured images.

The application allows users to provide an image of waste, which is sent from the React frontend to a Flask backend. The backend preprocesses the image and uses a trained TensorFlow/Keras model to predict the waste category and confidence score.

---

## ✨ Features

- 📸 Upload waste images
- 📷 Capture images using the camera
- 🤖 AI-based waste classification
- ♻️ Automatic waste category prediction
- 📊 Waste management dashboard
- 🗑️ Smart-bin monitoring interface
- ⚡ Real-time communication between frontend and backend
- 📈 Prediction confidence score
- 🌐 Full-stack web application

---

## 🧠 Machine Learning

The project uses a **MobileNetV2-based Convolutional Neural Network** for waste image classification.

### Model Pipeline

```text
Input Image
     ↓
Image Preprocessing
     ↓
Resize to 224 × 224
     ↓
MobileNetV2 Model
     ↓
Feature Extraction
     ↓
Classification
     ↓
Predicted Waste Category
     ↓
Confidence Score

Waste Categories

The model supports the following categories:

Organic
Recyclable
Cardboard
Glass
Metal
Paper
Plastic
Trash
📚 Dataset

The model was trained using the TrashNet dataset.

The dataset contains images representing different categories of waste and was used for training the waste classification model.

The complete dataset is not included in this repository.

🏗️ System Architecture
                  ┌─────────────────┐
                  │      User       │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  │   Vite + CSS    │
                  └────────┬────────┘
                           │
                     Image Upload
                           │
                           ▼
                  ┌─────────────────┐
                  │ Flask Backend   │
                  │   REST API      │
                  └────────┬────────┘
                           │
                     /predict
                           │
                           ▼
                  ┌─────────────────┐
                  │ MobileNetV2 CNN │
                  │     Model       │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Waste Category  │
                  │ + Confidence    │
                  └─────────────────┘

🔌 Backend API

The Flask backend provides a /predict endpoint.

Endpoint
POST /predict

The frontend sends an image using the file field.

The backend:

Receives the image.
Converts it to RGB.
Resizes it to 224 × 224.
Converts it into a NumPy array.
Passes it to the trained model.
Finds the predicted class.
Calculates the confidence score.
Returns the result as JSON.

Example response:

{
  "predicted_class": "plastic",
  "confidence": 0.92
}
🛠️ Tech Stack
Frontend
React.js
Vite
JavaScript
CSS
Backend
Python
Flask
Flask-CORS
Machine Learning
TensorFlow
Keras
MobileNetV2
NumPy
Pillow
Dataset
TrashNet
Tools
Git
GitHub
VS Code
npm