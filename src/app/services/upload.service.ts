import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(params: { provider: string; id: any; }){
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.post(`${API_Routes.URL}/files`, params, {headers: headers})
  }
}
