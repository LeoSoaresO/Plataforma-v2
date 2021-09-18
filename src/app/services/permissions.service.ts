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

  getGroups(){
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.get(`${API_Routes.URL}/permissioning/group` ,{ headers: headers })
    .toPromise()
    .then((response: any) => {
      return response
    })
  }

  getActions(role: any){
    return this.http.get(`${API_Routes.URL}/permissioning/group/?q=${role}`)
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

  putPermissions(role: any, params: any){
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.put(`${API_Routes.URL}/permissioning/group/?q=${role}`,params , { headers: headers })
    .toPromise()
    .then((response: any) =>{
      return response
    })
  }
}
