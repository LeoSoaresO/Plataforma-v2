import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { SettingsCustomSchemasService } from 'src/app/services/settings-custom-schemas.service';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-config-campos-customizados',
  templateUrl: './config-campos-customizados.component.html',
  styleUrls: ['./config-campos-customizados.component.scss'],
  providers:[ConfirmationService]
})
export class ConfigCamposCustomizadosComponent implements OnInit {
  settingsCustomSchemas: any = [];
  showModal: boolean;
  showModalDelete: boolean;
  customSchemasForm: FormGroup;
  success = false;
  settingCustomSchema: any = [];
  tipoCampo: any = ['date', 'string', 'number','regex','list','boolean'];
  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes

  ref: DynamicDialogRef;

  constructor(
    private settingsCustomSchemasService: SettingsCustomSchemasService,
    private FormBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.getCustomSchemasSettings();
    this.createCustomSchemasForm();
    this.primengConfig.ripple = true;
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

  remove(id: number) {
      this.confirmationService.confirm({
          header: 'Deseja excluir?',
          accept: () => {
            this.settingsCustomSchemasService.delCustomSchemasSettings(id)
            .subscribe(() => console.log(this.settingsCustomSchemas));
          },
          reject: () => {

          }
      });
  }

  getCustomSchema(id:number){
    this.settingCustomSchema = this.getCustomSchemaSetting(id);
    console.log(this.settingCustomSchema);
    
  }

  delCustomSchemasSettings(id: number){
    this.showModalDelete = !this.showModalDelete;
    this.settingsCustomSchemasService.delCustomSchemasSettings(id)
    .subscribe(() => console.log(this.settingsCustomSchemas));
  }

  getCustomSchemaSetting(id:number){
    return this.settingsCustomSchemasService.getCustomSchemaSetting(id)
    .subscribe(settingCustomSchema => this.settingCustomSchema = settingCustomSchema);
    // console.log(this.settingCustomSchema);
      
  }
}
