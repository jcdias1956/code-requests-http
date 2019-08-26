import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    // fazendo o request manual
    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    // ou fazendo o request usando o post
    return this.http.post(url, formData,
      {observe: 'events', reportProgress: true
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      // reportProgress
      // content-length
    });
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], {
      type: res.type
    });

    // IE 11
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // somente chrome
    // link.click();

    // somente FF
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    // somente para FF
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);

    // somente para chrome
    window.URL.revokeObjectURL(blob);
    link.remove();
  }
}
