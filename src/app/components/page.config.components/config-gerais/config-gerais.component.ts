import { Component } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';

@Component({
  selector: 'app-config-gerais',
  templateUrl: './config-gerais.component.html',
  styleUrls: ['./config-gerais.component.scss']
})
export class ConfigGeraisComponent {

  constructor() { }
  
  onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public color1: string = '#A9AEB3';
  public color2: string = '#A9AEB3';




}
