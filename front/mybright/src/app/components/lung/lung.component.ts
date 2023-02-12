import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ImageClassificationService } from 'src/app/services/image-classification.service';

@Component({
  selector: 'app-lung',
  templateUrl: './lung.component.html',
  styleUrls: ['./lung.component.css']
})
export class LungComponent implements OnInit {
  imageUrl = ''
  prediction!:Object
  file!:any;
  

  constructor(private service:ImageClassificationService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    let result:Array<number> =[];
    //let val:Number[]=[]
    this.file= <File>event.target.files[0];
    console.log(this.file.name)
    this.service.predictImages(this.file).subscribe(data => {
    result = data.prediction;
    console.log(result);
    let disease: string;
    const maxScore = Math.max(...result);
    if (maxScore === result[0]) {
      disease = "Bacterienne";
    } else if (maxScore === result[1]) {
       disease = "Normal";
    } else {
       disease = "Viral";
    }

    alert("La maladie la plus probable est : " + disease);

  
  });
   
   
  
    


  }
  save() {


  }

}
