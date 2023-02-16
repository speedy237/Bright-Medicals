import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/classes/exam';
import { User } from 'src/app/classes/user';
import { ExamService } from 'src/app/services/exam.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  examList:Exam[]=[];
  user!:User;
  id!:number;
  date=new Date();

  constructor(private route:ActivatedRoute,private service:UserService,private exService:ExamService) { }
  

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.service.getUser(this.id).subscribe(data=>{
      this.user=data;
    })
     this.exService.getExam().subscribe(data=>{
      console.table(data);
      this.examList=data;
     })
    
  }

}

