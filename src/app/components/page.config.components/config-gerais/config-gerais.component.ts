import { Component, OnInit} from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';
import { SettingsGeneralService } from 'src/app/services/settings-general.service';

@Component({
  selector: 'app-config-gerais',
  templateUrl: './config-gerais.component.html',
  styleUrls: ['./config-gerais.component.scss']
})
export class ConfigGeraisComponent implements OnInit{
  settingsGeneral: any = [];

  constructor(
    private settingsGeneralService: SettingsGeneralService,
  ) { }

  ngOnInit(): void {
    this.getGeneralSettings();
  }
  
  onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public color1: string = '#A9AEB3';
  public color2: string = '#A9AEB3';


  getGeneralSettings() {
    this.settingsGeneralService.getGeneralSettings()
    .subscribe(settingsGeneral => this.settingsGeneral = settingsGeneral);
    
  }

  postGeneralSettings(){
    
  }


}
