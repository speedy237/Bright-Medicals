from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from base import User,Patient,Exam

class UserCreate(BaseModel):
    
    nom: str
    prenom: str
    grade: str
    laboratoire: str
    login: str
    password: str

# Define the PatientCreate model for patient input
class PatientCreate(BaseModel):
    nom: str
    prenom: str
    sexe: str

# Define the ExamCreate model for exam input
class ExamCreate(BaseModel):
    date: str
    idP: int
    idU: int
    symptome: str
    images:  str
    result: str
class Credentials(BaseModel):
    login: str
    password: str
