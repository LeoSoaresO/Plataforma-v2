import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TimetableException } from 'src/app/components/page.config.components/config-timetables/timetableException';

@Injectable({
  providedIn: 'root'
})
export class SettingsTimetablesService {

  constructor(
    private http: HttpClient
  ) { }

  getTimatablesSettings(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/settingsTimatables/`);
  }

  getTimetablesExceptions(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/timetablesExceptions/`);
  }  

  postTimatablesException(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/timetablesExceptions/`, params)
  }  

  postTimatablesSettings(params: any): Observable<any> {
    return this.http.patch(`${API_Routes.URL}/settingsTimatables/`, params)
  }

  delLtiSettings(id: number): Observable<any> {
    return this.http.delete(`${API_Routes.URL}/timetablesExceptions/${id}`)
  }  
}
