import { Component, OnInit} from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { ColorPickerService } from 'ngx-color-picker';
import { FormBuilder, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SettingsGeneralService } from 'src/app/services/settings-general.service';

@Component({
  selector: 'app-config-gerais',
  templateUrl: './config-gerais.component.html',
  styleUrls: ['./config-gerais.component.scss']
})
export class ConfigGeraisComponent implements OnInit{

  settingsGeneral: any = [];
  success = false;
  settingsGeneralForm: FormGroup;
  public buttonActive : boolean = false;

  constructor(
    private FormBuilder: FormBuilder, 
    private settingsGeneralService: SettingsGeneralService
  ) { }

  ngOnInit(): void {
    this.buttonActive = false;
    this.getGeneralSettings();
    this.createGeneralForm();
  }
  
  onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public color1: string = '#A9AEB3';
  public color2: string = '#A9AEB3';


  getGeneralSettings() {
    this.settingsGeneralService.getGeneralSettings()
    .subscribe(settingsGeneral => this.setValueForm(settingsGeneral.data));
  }

  postGeneralSettings(){
    let site_title = this.settingsGeneralForm.controls.site_title.value; 
    let institution_name = this.settingsGeneralForm.controls.institution_name.value; 
    let navbar_background_color = this.settingsGeneralForm.controls.navbar_background_color.value; 
    let navbar_text_color = this.settingsGeneralForm.controls.navbar_text_color.value; 
    let logo = this.settingsGeneralForm.controls.logo.value;
    let login_background = this.settingsGeneralForm.controls.login_background.value;        
    const params = {
      "site_title": site_title,
      "institution_name": institution_name,
      "navbar_background_color": navbar_background_color,
      "navbar_text_color": navbar_text_color,
      "logo": logo,
      "login_background": login_background        
    }
    this.settingsGeneralService.postGeneralSettings(params)
    .subscribe(() => this.buttonActive = false);
  }

  setValueForm(settingsGeneral: any){
    this.settingsGeneralForm.controls['site_title'].setValue(settingsGeneral.site_title);
    this.settingsGeneralForm.controls['institution_name'].setValue(settingsGeneral.institution_name);
    this.settingsGeneralForm.controls['navbar_background_color'].setValue(settingsGeneral.navbar_background_color);
    this.settingsGeneralForm.controls['navbar_text_color'].setValue(settingsGeneral.navbar_text_color);
    this.settingsGeneralForm.controls['logo'].setValue(settingsGeneral.logo);
    this.settingsGeneralForm.controls['login_background'].setValue(settingsGeneral.login_background);
  }  

  //Forms
  createGeneralForm(){
    this.settingsGeneralForm = this.FormBuilder.group({
      site_title: ['', [Validators.required]],
      institution_name: ['', [Validators.required]],
      navbar_background_color: ['', [Validators.required]],
      navbar_text_color: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      login_background: ['', [Validators.required]],
    });
    setTimeout(() => {
      this.settingsGeneralForm.valueChanges.subscribe(val => {
        this.buttonActive = true;
      });
    }, 100);
  }
}
