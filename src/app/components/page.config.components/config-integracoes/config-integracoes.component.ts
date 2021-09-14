import { Component, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SettingsIntegrationsService } from 'src/app/services/settings-integrations.service';

@Component({
  selector: 'app-config-integracoes',
  templateUrl: './config-integracoes.component.html',
  styleUrls: ['./config-integracoes.component.scss']
})
export class ConfigIntegracoesComponent implements OnInit {
  settingsIntegration: any = [];
  settingsIntegrationForm: FormGroup;  

  constructor(private FormBuilder: FormBuilder, private settingsIntegrationsService: SettingsIntegrationsService) { }

  ngOnInit(): void {
    this.getIntegrationSettings();
    this.createIntegrationForm();
  }

  setValueForm(settingsIntegration: any){
    console.log(settingsIntegration);
    
    this.settingsIntegrationForm.controls['meet_external_validation_url'].setValue(settingsIntegration.meet_external_validation_url);
    this.settingsIntegrationForm.controls['meet_external_report_url'].setValue(settingsIntegration.meet_external_report_url);

    if (settingsIntegration.vlibras_enabled == 1) {
      this.settingsIntegrationForm.controls['vlibras_enabled'].setValue(true);
    }else{
      this.settingsIntegrationForm.controls['vlibras_enabled'].setValue(false);
    }

    if (settingsIntegration.meet_external_report_enabled == 1) {
      this.settingsIntegrationForm.controls['meet_external_validation_enabled'].setValue(true);
    }else{
      this.settingsIntegrationForm.controls['meet_external_validation_enabled'].setValue(false);
    }    

    if (settingsIntegration.userway_enabled == 1) {
      this.settingsIntegrationForm.controls['userway_enabled'].setValue(true);
    }else{
      this.settingsIntegrationForm.controls['userway_enabled'].setValue(false);
    }    

    if (settingsIntegration.meet_external_report_enabled == 1) {
      this.settingsIntegrationForm.controls['meet_external_report_enabled'].setValue(true);
    }else{
      this.settingsIntegrationForm.controls['meet_external_report_enabled'].setValue(false);
    }            
    
  }  

  getIntegrationSettings(){
    this.settingsIntegrationsService.getIntegrationSettings()
    .subscribe(settingsIntegration => this.setValueForm(settingsIntegration.data));
  }

  //Forms
  createIntegrationForm(){
    this.settingsIntegrationForm = this.FormBuilder.group({
      vlibras_enabled: ['', [Validators.required]],
      userway_enabled: ['', [Validators.required]],
      meet_external_validation_enabled: ['', [Validators.required]],
      meet_external_validation_url: ['', [Validators.required]],
      meet_external_report_enabled: ['', [Validators.required]],
      meet_external_report_url: ['', [Validators.required]],
    })
  }

  saveIntegration(){
    let vlibras_enabled = this.settingsIntegrationForm.controls.vlibras_enabled.value == false ? 0 : 1; 
    let userway_enabled = this.settingsIntegrationForm.controls.userway_enabled.value == false ? 0 : 1; 
    let meet_external_validation_enabled = this.settingsIntegrationForm.controls.vlibras_enabled.value == false ? 0 : 1; 
    let meet_external_report_enabled = this.settingsIntegrationForm.controls.vlibras_enabled.value == false ? 0 : 1; 
    let meet_external_validation_url = this.settingsIntegrationForm.controls.userway_enabled.value;
    let meet_external_report_url = this.settingsIntegrationForm.controls.userway_enabled.value;        
    const params = {
      "vlibras_enabled": vlibras_enabled,
      "userway_enabled": userway_enabled,
      "meet_external_validation_enabled ": meet_external_validation_enabled,
      "meet_external_validation_url ": meet_external_validation_url,
      "meet_external_report_enabled ": meet_external_report_enabled,
      "meet_external_report_url ": meet_external_report_url        
    }
    this.settingsIntegrationsService.postIntegrationSettings(params)
    .subscribe(() => console.log(params));
  }    

}
