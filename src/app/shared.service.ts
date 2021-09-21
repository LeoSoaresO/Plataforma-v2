import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  discipline$: Subject<any[]> = new Subject();

 
  getDiscipleObservable(): Observable<any[]> {
    return this.discipline$.asObservable();
  }

}
