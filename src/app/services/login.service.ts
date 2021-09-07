import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  firstLoad(){
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.get(`${API_Routes.URL}/whoami` ,{ headers: headers })
    .toPromise()
    .then((response: any )=>{
      return response
    })
  }
}
