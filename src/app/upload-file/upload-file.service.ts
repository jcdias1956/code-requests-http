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
    return this.http.post(url, formData);

  }
}