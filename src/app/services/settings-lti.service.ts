import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsLtiService {

  constructor(
    private http: HttpClient
  ) { }

  getLtiSettings(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settings/lti/`);
  }

  getLtiSetting(id:number): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settings/lti/${id}`);
  }  

  updatetLtiSetting(id:number, params: any): Observable<any> {
    return this.http.put(`${API_Routes.URL}/settings/lti/${id}`, params);
  } 

  postLtiSettings(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/settings/lti/`, params)
  }

  delLtiSettings(id: number): Observable<any> {
    return this.http.delete(`${API_Routes.URL}/settings/lti/${id}`)
  }
}
