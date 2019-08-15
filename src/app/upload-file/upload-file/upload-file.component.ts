import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;

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
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, 'http://localhost:8000/uploads')
        .subscribe(response => console.log('Upload Concluido'));
    }
  }
}
