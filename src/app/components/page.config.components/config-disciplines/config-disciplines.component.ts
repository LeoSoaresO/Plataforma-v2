import { Component, OnInit } from '@angular/core';
import { SettingsDisciplineService } from 'src/app/services/settings-disciplines.service';

@Component({
  selector: 'app-config-disciplines',
  templateUrl: './config-disciplines.component.html',
  styleUrls: ['./config-disciplines.component.scss']
})
export class ConfigDisciplinesurmasComponent implements OnInit {

  settingsDiscipline: any = [];
  defaultOrderOptions: any = [{select:true, text: 'A mais recente aparece no inicio'},{ select:false, text:'A mais recente aparece no final'}];

  constructor(
    private settingsDisciplineService: SettingsDisciplineService
  ) { }

  

  ngOnInit(): void {
    this.getDisciplineSettings();
     
  }

  getDisciplineSettings() {
    this.settingsDisciplineService.getDisciplineSettings()
    .subscribe( settingsDiscipline => this.settingsDiscipline = settingsDiscipline );
  }

  postDisciplineSettings(){
    this.settingsDisciplineService.postDisciplineSettings(this.settingsDiscipline)
    .subscribe(() => console.log(this.settingsDiscipline));
  }


}
