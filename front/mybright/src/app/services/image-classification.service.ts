import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpEvent, HttpEventType} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageClassificationService {

  constructor(private http:HttpClient) {}
   predictImage(image: File) {
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    const formData = new FormData();
    formData.append('file', image, image.name);
    return this.http.post('http://127.0.0.1:8000/predict', formData, { headers });
  }
  testApi(){
    return this.http.get('http://127.0.0.1:8000/test')
  }
  sendImage(imageUrl:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.get<any>(`http://localhost:8000/classify?imagepath=${encodeURIComponent(imageUrl)}`, httpOptions)
    .subscribe(data => {
      console.log(data);
    });


  }

  predictImages(image:any) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>('http://localhost:8000/predict', formData) ;
  }

}
