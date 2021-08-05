import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${API_Routes.URL}/users/`)
    .toPromise()
    .then((response: any) => {
      return response
    })
  }

  postUser(params: any) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.post(`${API_Routes.URL}/users/`, params, { headers: headers })
    .toPromise()
    .then((response: any) =>{  
      return response
    })
  }
}