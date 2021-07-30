import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor() { }

  selected:string = 'item1';

  ngOnInit(): void {
  }

  selectedIn(){
    console.log('as');
    
  }

}
