import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() isBig: boolean = true;
  @Input() value: number = 0;
  @Input() color: string = 'green';

   classes = [];

  constructor() { }

  ngOnInit() {
  }

}