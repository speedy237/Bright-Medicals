from fastapi import FastAPI,File, UploadFile 
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
import onnxruntime
import numpy as np
from PIL import Image
import cv2
session = onnxruntime.InferenceSession("onnx_model_name.onnx")
def convert_image_to_vector(image_path):
    # Charger l'image
    print('convert image')
    image = Image.open(image_path)
    # Redimensionner l'image
    image = image.resize((224, 224))
    # Convertir l'image en tableau numpy
    image_array = np.array(image)
    # Normaliser les valeurs de l'image
    image_array = image_array / 255
    print(image_array)
    return image_array
def predict_image(image):
    print('model inferernce')
    image = cv2.resize(image, (224,224))
    # convertir les entrées en type float
    image = image.astype(np.float32)
    # Redimensionnez les données pour qu'elles correspondent au format attendu
    image = np.transpose(image, (2,0,1))
    image = np.reshape(image, (1, 3, 224, 224))
    # Exécutez la prédiction sur l'image
    print('inference')
    prediction = session.run(None, {"input.1": image})[0]
    return prediction
app = FastAPI()
origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"welcome bright-medical"}
@app.post("/predict")
async def predict(file: UploadFile):
    print('image conversion')
     # Convertir l'image téléchargée en vecteur
    image_vector = convert_image_to_vector(file.file)
    # Effectuer la prédiction
    prediction = predict_image(image_vector)
    print(prediction)
    return {"prediction": prediction.tolist()}


     