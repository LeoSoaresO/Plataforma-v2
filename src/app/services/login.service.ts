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
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    console.time('request')
    return this.http.get(`${API_Routes.URL}/whoami` ,{ headers: headers })
    .toPromise()
    .then((response: any )=>{
      console.timeEnd('request');
      return response
    }).catch(() => {
      
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

  loginWithMicrosoft(params){
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    return this.http.post(`${API_Routes.URL}/auth?provider=microsoft` ,params ,{ headers: headers })
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
    return this.http.post(`${API_Routes.URL}/auth/password/reset`, email,{ headers: headers })
    .toPromise()
    .then((response: any)=>{
      return response
    })
  }

  resetToken(token){
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    return this.http.post(`${API_Routes.URL}/auth/password/validationToken`, token,{ headers: headers })
    .toPromise()
    .then((response: any)=>{
      return response
    })
  }

  updatePassword(params){
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    return this.http.post(`${API_Routes.URL}/auth/password/update`, params,{ headers: headers })
    .toPromise()
    .then((response: any)=>{
      return response
    })
  }
}
