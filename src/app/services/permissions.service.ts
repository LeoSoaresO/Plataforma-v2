import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private http: HttpClient
  ) { }

  getMenus(){
    return this.http.get(`${API_Routes.URL}/permissionsMenu`)
    .toPromise()
    .then((response: any) => {
      return response
    })
  }

  getRoles(){
    return this.http.get(`${API_Routes.URL}/permission_roles`)
    .toPromise()
    .then((response: any) =>{
      return response
    })
  }

  getActions(){
    return this.http.get(`${API_Routes.URL}/actions`)
    .toPromise()
    .then((response: any) =>{
      return response
    })
  }

  postRoles(params: any){
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.post(`${API_Routes.URL}/permission_roles`,params , { headers: headers })
    .toPromise()
    .then((response: any) =>{
      return response
    })
  }
}
