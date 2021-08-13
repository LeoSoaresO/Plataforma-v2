import { Component, OnInit } from '@angular/core';
import { SettingsDisciplineService } from 'src/app/services/settings-disciplines.service';

@Component({
  selector: 'app-config-turmas',
  templateUrl: './config-turmas.component.html',
  styleUrls: ['./config-turmas.component.scss']
})
export class ConfigTurmasComponent implements OnInit {

  settingsDiscipline: any = [];

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
