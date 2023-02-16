import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../classes/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  public  createPatient(patient:Patient):Observable<any>{
    return this.http.post<Patient>("http://localhost:8000/patient",patient);
  }
  public getPatient(id:number):Observable<any>{
    return this.http.get("http://localhost:8000/patient/"+id);

  }

}
