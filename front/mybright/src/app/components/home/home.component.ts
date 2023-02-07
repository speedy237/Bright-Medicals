import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/classes/exam';
import { EXAMS } from 'src/app/classes/mock-exam';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  examList:Exam[]=EXAMS;

  constructor() { }
  

  ngOnInit(): void {
  }

}

