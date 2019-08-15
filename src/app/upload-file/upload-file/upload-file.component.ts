import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit() {}

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
    const fileNames = [];
    this.files = new Set();
    for (let index = 0; index < selectedFiles.length; index++) {
      fileNames.push(selectedFiles[index].name);
      this.files.add(selectedFiles[index]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join('; ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, environment.BASE_URL + '/uploads')
        .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload Concluido');
          } else if (event.type === HttpEventType.UploadProgress) {
            const persentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso', persentDone);
            this.progress = persentDone;
          }
        });
    }
  }
}
