import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

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
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluido'));
        // .subscribe((event: HttpEvent<Object>) => {
        //   // console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Upload Concluido');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     const persentDone = Math.round((event.loaded * 100) / event.total);
        //     // console.log('Progresso', persentDone);
        //     this.progress = persentDone;
        //   }
        // });
    }
  }

  onDownloadExcel() {
    this.service.download( environment.BASE_URL + '/downloadExcel')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'e.xlsx');
    });
  }

  onDownloadPDF() {
    this.service.download( environment.BASE_URL + '/downloadPDF')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'p.pdf');
    });
  }
}
