import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  disicplineDetail: any;  

  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.getDisciplineDetail();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

    getDisciplineDetail(){
     this.sharedService.getDiscipleObservable().pipe(takeUntil(this.unsubscribe$))
      .subscribe(discipline => {
        this.disicplineDetail = discipline;
        console.log('this.disicplineDetail', this.disicplineDetail);
        
      });
  }


}
