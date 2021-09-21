import { Component, OnInit } from '@angular/core';
import { multi, single } from '../../../data';

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.scss']
})
export class NormalComponent implements OnInit {

  constructor() { 
    Object.assign(this, { multi });
    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  multi: any[];
  single: any[];
  // view: any;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  gradient: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };  

  onSelect(event: any) {
    console.log(event);
  }

}
