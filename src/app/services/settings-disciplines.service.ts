import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsDisciplineService {

  constructor(
    private http: HttpClient
  ) { }

  getDisciplineSettings(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settingsDiscipline/`);
  }

  postDisciplineSettings(params: any): Observable<any> {
    return this.http.patch(`${API_Routes.URL}/settingsDiscipline/`, params)
  }
}
