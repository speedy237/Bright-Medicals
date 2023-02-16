import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user=new User();

  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.http.post("http://localhost:8000/user",this.user).subscribe(data=>{
      console.log(data);
    })
    this.route.navigate(['/sign-in'])
  }
  

}
