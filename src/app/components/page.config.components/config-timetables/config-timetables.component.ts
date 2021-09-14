import { Component, OnInit } from '@angular/core';
import { SettingsTimetablesService } from 'src/app/services/settings-timetables.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { TimetableException } from './timetableException';

@Component({
  selector: 'app-config-timetables',
  templateUrl: './config-timetables.component.html',
  styleUrls: ['./config-timetables.component.scss']
})
export class ConfigTimetablesComponent implements OnInit {

  settingsTimetables: any = [];
  // timetablesExceptions: TimetableException;
  timetablesForm: FormGroup;
  timetablesExceptionForm: FormGroup;
  name: FormControl;
  date: FormControl;
  timetablesException:any;  
  listTimetablesExceptions: TimetableException[];

  constructor(
    private settingsTimetablesService:SettingsTimetablesService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.timetablesExceptionForm = new FormGroup({
      timetablesExceptions: this.FormBuilder.array([])
    });
    this.getTimetablesSettings();// load settingsTimetables array
    this.createTimetablesForm();
    this.getTimetablesExceptions();//load timetablesExceptions array
  }

  initFormArray(timetablesException: any[]) {
    const formArray = this.timetablesExceptionForm.get('timetablesExceptions') as FormArray;
    
    timetablesException.map(item => {
      formArray.push(this.createTimetablesExceptionForm(item));
    });
    this.timetablesExceptionForm.setControl('timetablesException', formArray);
  }  

  //Forms
  createTimetablesForm(){
    this.timetablesForm = this.FormBuilder.group({
      timetable_enabled: ['', [Validators.required]],
      frequency_status_enabled: ['', [Validators.required]]
    })
  } 
  createTimetablesExceptionForm(timetablesException: any): FormGroup {
    // console.log(timetablesException);
    
    let formGroupTimetables: FormGroup = new FormGroup(
      {
        id: new FormControl(timetablesException.id),
        name: new FormControl(timetablesException.name),
        date: new FormControl(timetablesException.date)
      }
    );
    return formGroupTimetables;
  }     

  get timetablesExceptions() {
    return this.timetablesExceptionForm.get('timetablesExceptions') as FormArray;
  }

  addItem() {
    this.timetablesExceptions.push(this.createTimetablesExceptionForm(this.timetablesException));
  }  

  setValueForm(settingsTimetables: any){
    // console.log(settingsTimetables);
    
    this.timetablesForm.controls['timetable_enabled'].setValue(settingsTimetables.timetable_enabled);
    this.timetablesForm.controls['frequency_status_enabled'].setValue(settingsTimetables.frequency_status_enabled);
  }  

  getTimetablesSettings(){
    this.settingsTimetablesService.getTimatablesSettings()
    .subscribe(settingsTimetables => this.setValueForm(settingsTimetables.data));
  }  

  getTimetablesExceptions(){
    this.settingsTimetablesService.getTimetablesExceptions()
    .subscribe(timetablesExceptionData => this.timetablesException = timetablesExceptionData)
    setTimeout(() => {
      this.initFormArray(this.timetablesException);
    }, 100);
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

    const formArray = this.timetablesExceptionForm.get('timetablesExceptions') as FormArray;

    for (const iterator of formArray.controls) {
      if (iterator.value.id == null) {

        let paramsException = {
          "name": iterator.value.name,
          "date": iterator.value.date
        }

        this.settingsTimetablesService.postTimatablesException(paramsException)
        .subscribe(() => console.log(paramsException));    
      }
    }
  }

  removeItem(itemIndex: number){
    this.timetablesExceptions.removeAt(itemIndex);

    this.settingsTimetablesService.delLtiSettings(itemIndex)
    .subscribe(() => console.log(itemIndex));      

    
  }

}
