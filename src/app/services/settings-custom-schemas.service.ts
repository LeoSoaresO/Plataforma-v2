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
    return this.http.get<any>(`${API_Routes.URL}/settingsCustomSchemas/`);
  }

  postCustomSchemasSettings(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/settingsCustomSchemas/`, params)
  }
}
