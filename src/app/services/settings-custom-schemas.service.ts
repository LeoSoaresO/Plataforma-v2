import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsCustomSchemasService {

  constructor(
    private http: HttpClient
  ) { }

  getCustomSchemasSettings(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settings/customSchemas/`);
  }

  getCustomSchemaSetting(id:number): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settings/customSchemas/${id}`);
  }

  updatetCustomSchemaSetting(id:number, params: any): Observable<any> {
    return this.http.put(`${API_Routes.URL}/settings/customSchemas/${id}`, params);
  }     

  postCustomSchemasSettings(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/settings/customSchemas/`, params)
  }

  delCustomSchemasSettings(id: number): Observable<any> {
    return this.http.delete(`${API_Routes.URL}/settings/customSchemas/${id}`)
  }
}
