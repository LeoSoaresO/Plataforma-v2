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
    return this.http.get<any>(`${API_Routes.URL}/settings/timetables/`);
  }

  getTimetablesExceptions(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/timetables/exceptions/`);
  }  

  postTimatablesException(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/timetables/exceptions/`, params)
  }  

  postTimatablesSettings(params: any): Observable<any> {
    return this.http.patch(`${API_Routes.URL}/settings/timetables/`, params)
  }

  delLtiSettings(id: number): Observable<any> {
    return this.http.delete(`${API_Routes.URL}/timetables/exceptions/${id}`)
  }  
}
