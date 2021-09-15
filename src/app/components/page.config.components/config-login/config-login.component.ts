import { Component, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SettingsLoginService } from 'src/app/services/settings-login.service';

@Component({
  selector: 'app-config-login',
  templateUrl: './config-login.component.html',
  styleUrls: ['./config-login.component.scss']
})
export class ConfigLoginComponent implements OnInit {
  settingsLogin: any = [];
  settingsLoginForm: FormGroup;  
  public buttonActive : boolean = false;

  constructor(private FormBuilder: FormBuilder, private settingsLoginService: SettingsLoginService) { }

  ngOnInit(): void {
    this.buttonActive = false;
    this.getLoginSettings();
    this.createLoginForm();
  }

  setValueForm(settingsLogin: any){
    console.log(settingsLogin);
    
    if (settingsLogin.redirectToDiscipline == 1) {
      this.settingsLoginForm.controls['redirectToDiscipline'].setValue(true);
    }else{
      this.settingsLoginForm.controls['redirectToDiscipline'].setValue(false);
    }
    
  }  

  getLoginSettings(){
    this.settingsLoginService.getLoginSettings()
    .subscribe(settingsLogin => this.setValueForm(settingsLogin.data));
  }

  //Forms
  createLoginForm(){
    this.settingsLoginForm = this.FormBuilder.group({
      redirectToDiscipline: ['', [Validators.required]],
    })
    setTimeout(() => {
      this.settingsLoginForm.valueChanges.subscribe(val => {
        this.buttonActive = true;
      });
    }, 100);
  }

  saveLogin(){
    let redirectToDiscipline = this.settingsLoginForm.controls.redirectToDiscipline.value == false ? 0 : 1; 
    const params = {
      "redirectToDiscipline": redirectToDiscipline,
    }
    this.settingsLoginService.postLoginSettings(params)
    .subscribe(() => console.log(params));
  }   
}
