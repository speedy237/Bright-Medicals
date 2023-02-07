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
  file!:File;

  constructor(private service:ImageClassificationService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.file= <File>event.target.files[0];
    if (this.file) {
      this.imageUrl = this.file.name;
    }


  }
  save() {

    console.log(this.file.name)

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      const image = reader.result;
      this.service.predictImage(image).subscribe((res: any) => {
        this.prediction = res.prediction;
        console.log(this.prediction)
      });
    };

  }

}
