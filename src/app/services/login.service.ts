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
    console.time('request')
    return this.http.get(`${API_Routes.URL}/whoami` ,{ headers: headers })
    .toPromise()
    .then((response: any )=>{
      console.timeEnd('request');
      return response
    })
  }

  login(params){
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    return this.http.post(`${API_Routes.URL}/auth?provider=password` ,params ,{ headers: headers })
    .toPromise()
    .then(( response: any )=>{
      return response
    })
  }

  loginWithGoogle(params){
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    return this.http.post(`${API_Routes.URL}/auth?provider=google` ,params ,{ headers: headers })
    .toPromise()
    .then(( response: any )=>{
      return response
    })
  }

  resetPassword(email){
      const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      }
    return this.http.post(`${API_Routes.URL}/api/auth/password/reset`, email,{ headers: headers })
    .toPromise()
    .then((response: any)=>{
      return response
    })
  }
}
