import { Component, OnInit } from '@angular/core';
import { SettingsTimetablesService } from 'src/app/services/settings-timetables.service';
import { FormBuilder, AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-timetables',
  templateUrl: './config-timetables.component.html',
  styleUrls: ['./config-timetables.component.scss']
})
export class ConfigTimetablesComponent implements OnInit {

  settingsTimetables: any = [];
  timetablesForm: FormGroup;  
  constructor(
    private settingsTimetablesService:SettingsTimetablesService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTimetablesSettings();
    this.createTimetablesForm();
  }

  //Forms
  createTimetablesForm(){
    this.timetablesForm = this.FormBuilder.group({
      timetable_enabled: ['', [Validators.required]],
      frequency_status_enabled: ['', [Validators.required]]
    })
  }    

  setValueForm(settingsTimetables: any){
    console.log(settingsTimetables);
    
    this.timetablesForm.controls['timetable_enabled'].setValue(settingsTimetables.timetable_enabled);
    this.timetablesForm.controls['frequency_status_enabled'].setValue(settingsTimetables.frequency_status_enabled);
  }  

  getTimetablesSettings(){
    this.settingsTimetablesService.getTimatablesSettings()
    .subscribe(settingsTimetables => this.setValueForm(settingsTimetables));
  }  

  saveTimetables(){
    let timetable_enabled = this.timetablesForm.controls.timetable_enabled.value;
    let frequency_status_enabled = this.timetablesForm.controls.frequency_status_enabled.value;
    const params = {
      "timetable_enabled": timetable_enabled,
      "frequency_status_enabled": frequency_status_enabled 
    }
    this.settingsTimetablesService.postTimatablesSettings(params)
    .subscribe(() => console.log(params));
  }

}
