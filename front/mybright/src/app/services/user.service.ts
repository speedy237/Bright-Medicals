import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  public getUser(id:number): Observable<any>{
    return this.http.get("http://localhost:8000/user/"+id)

  }


}
