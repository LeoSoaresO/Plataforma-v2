import { Component, OnInit } from '@angular/core';
import { DisciplineDetailService } from 'src/app/services/discipline-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-discipline-detail',
  templateUrl: './discipline-detail.component.html',
  styleUrls: ['./discipline-detail.component.scss']
})
export class DisciplineDetailComponent implements OnInit {

  disicplineDetail: any;
  selected: string = 'overview';  
  id: any;

  constructor(
    private route: ActivatedRoute,    
    private  disciplineDetailService: DisciplineDetailService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getDisciplineDetail();
    this.changeOverview();
  }

  getDisciplineDetail(){
    console.log(this.route.snapshot.paramMap.get('id'));
    
    // let id = String(this.route?.snapshot?.paramMap?.get('id'));
    this.id = parseInt(this.route?.snapshot?.paramMap?.get('id')!);
    this.disciplineDetailService.getDisciplineDetail(this.id)
      .subscribe( discipline =>{
        this.disicplineDetail = discipline
        this.sharedService.discipline$.next(discipline);
        
      });
  }

  changeOverview(){
      this.selected = 'overview';
      this.router.navigate(['overview'], {relativeTo:this.route});
      this.id = parseInt(this.route?.snapshot?.paramMap?.get('id')!);
      this.disciplineDetailService.getDisciplineDetail(this.id)
        .subscribe( discipline =>{
          this.disicplineDetail = discipline
          this.sharedService.discipline$.next(discipline);
        });      
      
  }  

  changeNotes(){
      this.selected = 'notes';
      this.router.navigate(['notes'], {relativeTo:this.route});
  }  

  changeContent(){
      this.selected = 'content';
      this.router.navigate(['content'], {relativeTo:this.route});
  }  
  

}
