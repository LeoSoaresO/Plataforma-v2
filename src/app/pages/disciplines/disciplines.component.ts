import { Component, OnInit } from '@angular/core';
import { DisciplineService } from 'src/app/services/discipline.service';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {

  disciplines: any;

  constructor(
    private disciplineService: DisciplineService,
  ) { }

  ngOnInit(): void {
    this.getDisciplines();
  }

  getDisciplines() {
      this.disciplineService.getDisciplines()
      .subscribe( disciplines => this.disciplines = disciplines);
      
  }  

}
