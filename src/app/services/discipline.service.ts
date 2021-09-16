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

  getDisciplines(types: any, query: any, level: any, modalities: any, months: any, years: any): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/disciplines/?type=${types}&q=${query}&levels=${level}&modalities=${modalities}&months=${months}&years=${years}`);
    // return this.http.get<any>(`http://localhost:3000/discplines`);
  }

  postDisciplines(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/disciplines/`, params)
  }  


  deleteDisciplines(id:number){
    return this.http.delete(`${API_Routes.URL}/disciplines/${id}`);
  }
}
