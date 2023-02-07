import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageClassificationService {

  constructor(private http:HttpClient) {}
   predictImage(image: any) {
    const endpoint = 'http://127.0.0.1:8000/predict';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(endpoint, { image }, { headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
