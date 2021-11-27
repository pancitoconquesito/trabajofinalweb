import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  private baseUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) { }


  // HttpUploadOptions = {
  //   headers: new HttpHeaders({ Accept: 'application/json' }),
  // };

  // upload(file: File): Observable<any> {
    
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);
  //   console.log(formData);

  //   return this.http.post( `${this.baseUrl}/upload_img`,formData, this.HttpUploadOptions);
  // }
}
