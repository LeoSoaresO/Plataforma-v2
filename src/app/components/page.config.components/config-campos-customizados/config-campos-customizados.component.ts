import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SettingsCustomSchemasService } from 'src/app/services/settings-custom-schemas.service';

@Component({
  selector: 'app-config-campos-customizados',
  templateUrl: './config-campos-customizados.component.html',
  styleUrls: ['./config-campos-customizados.component.scss']
})
export class ConfigCamposCustomizadosComponent implements OnInit {
  settingsCustomSchemas: any = [];
  showModal: boolean;
  customSchemasForm: FormGroup;
  success = false;
  tipoCampo: any = ['date', 'string', 'number','regex','list','boolean'];
  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes
  constructor(
    private settingsCustomSchemasService: SettingsCustomSchemasService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCustomSchemasSettings();
    this.createCustomSchemasForm();
  }
  
  //Forms
  createCustomSchemasForm(){
    this.customSchemasForm = this.FormBuilder.group({
      codCampo: ['', [Validators.required]],
      nomeCampo: ['', [Validators.required]],
      descCampo: ['', [Validators.required]],
      userCode: ['', [Validators.required]],
      mascaraDados: ['', [Validators.required]],
      tipoCampo: ['']
    })
  }

  changeTipoCampo(e: any) {
    this.tipoCampo.setValue(e.target.value, {
      onlySelf: true
    })
  }


  // postCustomSchemas(){
  //   let codCampo = this.customSchemasForm.controls.codCampo.value
  //   let nomeCampo = this.customSchemasForm.controls.nomeCampo.value
  //   let descCampo = this.customSchemasForm.controls.descCampo.value
  //   let tipoCampo = this.customSchemasForm.controls.tipoCampo.value
  //   let mascaraDados = this.customSchemasForm.controls.mascaraDados.value
  //   const params = {
  //      "cs_code": codCampo,
  //      "screen_name": nomeCampo,
  //      "screen_label": descCampo,
  //      "mandatory": 0,
  //      "unique": 1,
  //      "default": null,
  //      "type": tipoCampo, // string, number, date, regex, list, boolean
  //      "custom_format": mascaraDados,
  //   }
  //     console.log(params);
  //     console.log(JSON.stringify(params));            
  //     const response = this.settingsCustomSchemasService.postCustomSchemasSettings(params)
  //     console.log(response)
  //        if(response){
  //         this.success = true
  //         if (this.success == true) {
  //           this.showModal = false
  //         }
  //        }
  // }

  getCustomSchemasSettings() {
    this.settingsCustomSchemasService.getCustomSchemasSettings()
    .subscribe(settingsCustomSchemas => this.settingsCustomSchemas = settingsCustomSchemas);
    
  }

  postCustomSchemasSettings(){
        let codCampo = this.customSchemasForm.controls.codCampo.value
    let nomeCampo = this.customSchemasForm.controls.nomeCampo.value
    let descCampo = this.customSchemasForm.controls.descCampo.value
    let tipoCampo = this.customSchemasForm.controls.tipoCampo.value
    let mascaraDados = this.customSchemasForm.controls.mascaraDados.value
    const params = {
       "cs_code": codCampo,
       "screen_name": nomeCampo,
       "screen_label": descCampo,
       "mandatory": 0,
       "unique": 1,
       "default": null,
       "type": tipoCampo, // string, number, date, regex, list, boolean
       "custom_format": mascaraDados,
    }

    this.settingsCustomSchemasService.postCustomSchemasSettings(params)
    .subscribe(() => console.log(this.settingsCustomSchemas));
  }

}
