import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  template: `<countdown [config]="{ leftTime: 120, format: 'm:s' }"></countdown>`,
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
