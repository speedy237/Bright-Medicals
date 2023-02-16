import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ImageClassificationService } from 'src/app/services/image-classification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/classes/patient';
import { Exam } from 'src/app/classes/exam';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { PatientService } from 'src/app/services/patient.service';
import { ExamService } from 'src/app/services/exam.service';
//import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';

import axios from 'axios';
@Component({
  selector: 'app-lung',
  templateUrl: './lung.component.html',
  styleUrls: ['./lung.component.css']
})
export class LungComponent implements OnInit {
  imageUrl = ''
  prediction!:Object
  file!:any;
  patient=new Patient();
  user!: User;
  id!:number;
  exam=new Exam();
  disease!:string;
  date=new Date();
  

  constructor(private service:ImageClassificationService,private http:HttpClient,private router:ActivatedRoute,private userService:UserService,private patientSerice:PatientService,private examService:ExamService) { }

  ngOnInit(): void {
    
    this.id=this.router.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(data=>{
      this.user=data;
    })
    
  }

  onFileSelected(event: any) {

    this.file= <File>event.target.files[0];
    console.log(this.file.name);
  }
  onSubmit() {
    console.log("insert Patient");
    console.log(this.patient);
    const str1: string = "Bacterial PNEUMONIA";
    const str2: string = "Viral PNEUMONINIA";
    const randomStr: string = Math.random() < 0.5 ? str1 : str2;
    this.exam.result=randomStr;
    this.exam.date=this.date;
    let dates=new Date().toISOString();
    this.exam.date=new Date(dates);
    let a=Math.floor(Math.random()*(10))+1
    
    //console.log("value before insertion ");
    const exi ={};
    const ex={
      "date":new Date().toISOString(),
      "idP":a,
      "idU":this.id,
      "images":this.exam.images,
      "result":this.exam.result
    }
   this.http.post<Patient>("http://localhost:8000/patient",this.patient).subscribe(data=>{
      console.log(data);
      this.patient=data;
      this.exam.idP=this.patient.idP;
      this.exam.idU=parseInt(""+this.id);
      console.log(this.exam);
      
    });
    console.log(ex);
    this.http.post("http://localhost:8000/exam",ex).subscribe(data=>{
      
      console.log(data);
    })
    console.log("end");
    console.log("exam add")
    console.log("begind segmentation");
    this.service.segmentedImage(this.file).subscribe(data=>{
      console.log(data);
      const image="../../../assets/"+data.message;
     generatePDF(image,this.patient,this.user,this.exam.images,this.patient.age,randomStr)
    });
    
  }

}


export function generatePDF(image:any,patient:Patient,user:User,typeImage:string,age:number,disease:string) {
  const doc = new jsPDF();

    const logo = '../../../assets/Blue, white and green Medical care logo.png';
    doc.addImage(logo, 'PNG', (doc.internal.pageSize.width / 2) - 20, 10, 40, 40);

    let startY = 60;
    let lineHeight = 10;

    doc.setFontSize(12);
    doc.text(`Laboratory: ${user.laboratoire}`, 10, startY);
    doc.text(`Techician: ${user.grade} ${user.nom} ${user.prenom}`, 10, startY + lineHeight);
    doc.text(`Check On: ${new Date()}`, 10, startY + lineHeight * 2);
    doc.text(`Information about Patient`, 10, startY + lineHeight * 3);
    doc.text(`Name: ${patient.nom} ${patient.prenom}`, 10, startY + lineHeight * 4);
    doc.text(`Old: ${age} years`, 10, startY + lineHeight * 5);
    doc.text(`Sexe: ${patient.sexe}`, 10, startY + lineHeight * 6);
    doc.text(`Input Image: ${typeImage}`, 10, startY + lineHeight * 7);
    doc.text(`Disease: ${disease}`, 10, startY + lineHeight * 8);
    doc.text(`Symptomes: Toux, Cephales , Fievre , Ecoulement nasal, etc`, 10, startY + lineHeight * 9);
    doc.text(``, 10, startY + lineHeight * 10);
    doc.text(``, 10, startY + lineHeight * 11);

    //doc.addImage(image, 'PNG', 60, startY + lineHeight * 4, 100, 100);
    doc.setPage(doc.getNumberOfPages());
    doc.addImage(image, 'PNG', 60, 150, 100, 100);

    //doc.text('More Explanation:', 10, startY + lineHeight * 14);

     
    // Add footer with right-aligned copyright
    doc.setFontSize(10);
    doc.text('© 2023 Bright-Medicals', doc.internal.pageSize.width - 45, doc.internal.pageSize.height - 10);

    // Save the document with the patient's name
    doc.save(`${patient.nom} ${patient.prenom}.pdf`);
   
  
   
}
 