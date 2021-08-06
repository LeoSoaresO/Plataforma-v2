import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsGeneralService {

  constructor(
    private http: HttpClient
  ) { }

  getGeneralSettings(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settings/`);
  }

  postGeneralSettings(params: any) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.post(`${API_Routes.URL}/settings/`, params, { headers: headers })
    .toPromise()
    .then((response: any) =>{  
      return response
    })
  }
}