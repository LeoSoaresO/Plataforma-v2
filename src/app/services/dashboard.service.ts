import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_Routes } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getDash(){
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "{$_SERVER['HTTP_ORIGIN']}",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    }
    return this.http.get(`${API_Routes.URL}/dashboard` ,{ headers: headers })
    .toPromise()
    .then((response: any )=>{
      console.timeEnd('request');
      return response
    })
  }
}