import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
    const fileNames = [];
    for (let index = 0; index < selectedFiles.length; index++) {
      fileNames.push(selectedFiles[index].name);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join('; ');
  }

}
