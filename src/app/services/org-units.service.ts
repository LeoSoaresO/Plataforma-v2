import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_Routes } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgUnitsService {

  constructor(
    private http: HttpClient
  ) { }

  getOrgUnits(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/organizational-units/`);
  }

  getTypes(): Observable<any> {
    return this.http.get<any>(`${API_Routes.URL}/types/`);
  }  

  postOrgUnits(params: any): Observable<any> {
    return this.http.post(`${API_Routes.URL}/organizational-units/`, params)
  }

  updateOrgUnits(id:number, params: any): Observable<any> {
    return this.http.put(`${API_Routes.URL}/organizational-units/${id}`, params);
  }   

  delOrgUnits(id: number): Observable<any> {
    return this.http.delete(`${API_Routes.URL}/organizational-units/${id}`)
  }  

}
