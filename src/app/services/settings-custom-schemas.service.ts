import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getCustomSchemaSetting(id:number): Observable<any> {
    return this.getCustomSchemasSettings().pipe(
      map(
        (movies: any[]) => movies.find(movie => movie.id == id)
      ));
  }  

  postCustomSchemasSettings(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/settingsCustomSchemas/`, params)
  }

  delCustomSchemasSettings(id: number): Observable<any> {
    return this.http.delete(`${API_Routes.URL}/settingsCustomSchemas/${id}`)
  }
}
