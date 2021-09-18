import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineDetailService {

  constructor(
    private http: HttpClient
  ) { }

  getDisciplineDetail(id: any): Observable<any> {
    // return this.http.get<any>(`${API_Routes.URL}/disciplineDetail/`);
    return this.http.get<any>(`http://localhost:3000/disciplineDetail/${id}`);
  }
}
