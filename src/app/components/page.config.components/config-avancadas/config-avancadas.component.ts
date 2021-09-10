import { Component, OnInit } from '@angular/core';
import { SettingsAdvancedService } from 'src/app/services/settings-advanced.service';

@Component({
  selector: 'app-config-avancadas',
  templateUrl: './config-avancadas.component.html',
  styleUrls: ['./config-avancadas.component.scss']
})
export class ConfigAvancadasComponent implements OnInit {

  settingsAdvanced: any = [];

  constructor(
    private settingsAdvancedService: SettingsAdvancedService
  ) { }

  ngOnInit(): void {
    this.getAdvancedSettings();
  }

  getAdvancedSettings() {
    this.settingsAdvancedService.getAdvancedSettings()
    .subscribe( settingsAdvanced => this.settingsAdvanced = settingsAdvanced );
  }

  postAdvancedSettings(){
    this.settingsAdvancedService.postAdvancedSettings(this.settingsAdvanced)
    .subscribe(() => console.log(this.settingsAdvanced));
  }


}
