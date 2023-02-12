from fastapi import FastAPI,File, UploadFile ,HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from inference import predict_image,convert_image_to_vector
from base import Patient,User,Exam,Base
from model import PatientCreate,UserCreate,ExamCreate,Credentials

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
# Connect to the database
engine = create_engine("sqlite:///database.db")
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
@app.get("/")
def read_root():
    return {"welcome:" "bright-medical"}
@app.get("/test")
def test_api():
    return {"welcome bright-medical"}    
@app.post("/predict")
async def predict(file: UploadFile):
    print('image conversion')
     # Convertir l'image téléchargée en vecteur
    image_vector = convert_image_to_vector(file.file)
    # Effectuer la prédiction
    prediction = predict_image(image_vector)
    print(prediction)
    response={"prediction": prediction.tolist()}
    return JSONResponse(content=response)
@app.post("/detect")    
async def prediction(imagepath:str):
    #print('image conversion')
     # Convertir l'image téléchargée en vecteur
    image_vector = convert_image_to_vector(imagepath)
    # Effectuer la prédiction
    prediction = predict_image(image_vector)
    print(prediction)
    return {"prediction": prediction.tolist()}    

@app.get("/classify")
async def convert(imagepath:str):
    #print('image conversion')
     # Convertir l'image téléchargée en vecteur
    image_vector = convert_image_to_vector(imagepath)
    # Effectuer la prédiction
    prediction = predict_image(image_vector)
    print(prediction)
    return {"prediction": prediction.tolist()}    
@app.post("/user")
async def create_user(user: UserCreate):
    session = SessionLocal()
    new_user = User(nom=user.nom, prenom=user.prenom, grade=user.grade, laboratoire=user.laboratoire, login=user.login,password=user.password)
    session.add(new_user)
    session.commit()
    session.close()
    return {"message": "User created successfully"}
@app.get("/user/{id}")
async def read_user(id: int):
    session = SessionLocal()
    user = session.query(User).filter(User.idU == id).first()
    session.close()
    return user.__dict__

@app.put("/user/{id}")
async def update_user(id: int, user: UserCreate):
    session = SessionLocal()
    user_to_update = session.query(User).filter(User.idU == id).first()
    user_to_update.nom = user.nom
    user_to_update.prenom = user.prenom
    user_to_update.grade = user.grade
    user_to_update.laboratoire = user.laboratoire
    user_to_update.login = user.login
    user_to_update.password = user.password
    session.commit()
    session.close()
    return {"message": "User updated successfully"}

@app.delete("/user/{id}")
async def delete_user(id: int):
    session = SessionLocal()
    user_to_delete = session.query(User).filter(User.idU == id).first()
    session.delete(user_to_delete)
    session.commit()
    session.close()
    return {"message": "User deleted successfully"}    
     
@app.post("/patient")
async def create_patient(patient: PatientCreate):
    session = SessionLocal()
    new_patient = Patient(nom=patient.nom, prenom=patient.prenom, sexe=patient.sexe)
    session.add(new_patient)
    session.commit()
    session.close()
    return {"message": "Patient created successfully"}

@app.get("/patient/{id}")
async def read_patient(id: int):
    session = SessionLocal()
    patient = session.query(Patient).filter(Patient.idP == id).first()
    session.close()
    return patient.__dict__

@app.put("/patient/{id}")
async def update_patient(id: int, patient: PatientCreate):
    session = SessionLocal()
    patient_to_update = session.query(Patient).filter(Patient.idP == id).first()
    patient_to_update.nom = patient.nom
    patient_to_update.prenom = patient.prenom
    patient_to_update.sexe = patient.sexe
    session.commit()
    session.close()
    return {"message": "Patient updated successfully"}

@app.delete("/patient/{id}")
async def delete_patient(id: int):
    session = SessionLocal()
    patient_to_delete = session.query(Patient).filter(Patient.idP == id).first()
    session.delete(patient_to_delete)     
    session.commit()
    session.close()
    return {"message": "Patient deleted successfully"}
@app.post("/exam")
async def create_exam(exam: ExamCreate):
    session = SessionLocal()
    new_exam = Exam(date=exam.date, idP=exam.idP, idU=exam.idU, symptome=exam.symptome, result=exam.result)
    session.add(new_exam)
    session.commit()
    session.close()
    return {"message": "Exam created successfully"}

@app.get("/exam/{id}")
async def read_exam(id: int):
    session = SessionLocal()
    exam = session.query(Exam).filter(Exam.id == id).first()
    session.close()
    return exam.__dict__

@app.put("/exam/{id}")
async def update_exam(id: int, exam: ExamCreate):
    session = SessionLocal()
    exam_to_update = session.query(Exam).filter(Exam.id == id).first()
    exam_to_update.date = exam.date
    exam_to_update.idP = exam.idP
    exam_to_update.idU = exam.idU
    exam_to_update.symptome = exam.symptome
    exam_to_update.result = exam.result
    session.commit()
    session.close()
    return {"message": "Exam updated successfully"}

@app.delete("/exam/{id}")
async def delete_exam(id: int):
    session = SessionLocal()
    exam_to_delete = session.query(Exam).filter(Exam.id == id).first()
    session.delete(exam_to_delete)
    session.commit()
    session.close()
    return {"message": "Exam deleted successfully"}    
@app.post("/login")
async def login(credentials: Credentials):
    session = SessionLocal()
    try:
        user = session.query(User).filter(User.login == credentials.login).first()
        if not user:
            raise HTTPException(status_code=400, detail="Incorrect login or password")
        if user.password != credentials.password:
            raise HTTPException(status_code=400, detail="Incorrect login or password")
        return user
    finally:
        session.close()