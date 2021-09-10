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
}
