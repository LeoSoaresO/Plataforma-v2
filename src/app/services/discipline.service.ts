import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(
    private http: HttpClient
  ) { }

  getDisciplines(external_id: any): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/${external_id}/basic`);
  }
}
