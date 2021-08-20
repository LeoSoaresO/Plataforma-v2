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
  editMode: boolean;
  customSchemaId: number;
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

    if (this.editMode) {
      this.editMode = false;
      this.settingsCustomSchemasService.updatetCustomSchemaSetting(this.customSchemaId, params)
      .subscribe(() => console.log(this.settingsCustomSchemas));
    }else{
      this.settingsCustomSchemasService.postCustomSchemasSettings(params)
      .subscribe(() => console.log(this.settingsCustomSchemas));
    }

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

  delCustomSchemasSettings(id: number){
    this.settingsCustomSchemasService.delCustomSchemasSettings(id)
    .subscribe(() => console.log(this.settingsCustomSchemas));
  }

  setValueForm(settingCustomSchema: any){
    console.log(this.customSchemasForm);
    
    this.customSchemasForm.controls['codCampo'].setValue(settingCustomSchema.cs_code);
    this.customSchemasForm.controls['nomeCampo'].setValue(settingCustomSchema.screen_name);
    this.customSchemasForm.controls['descCampo'].setValue(settingCustomSchema.screen_label);
    this.customSchemasForm.controls['tipoCampo'].setValue(settingCustomSchema.type);
    this.customSchemasForm.controls['mascaraDados'].setValue(settingCustomSchema.custom_format);
  }

  openModal(){
    this.customSchemasForm.controls['codCampo'].setValue('');
    this.customSchemasForm.controls['nomeCampo'].setValue('');
    this.customSchemasForm.controls['descCampo'].setValue('');
    this.customSchemasForm.controls['tipoCampo'].setValue('');
    this.customSchemasForm.controls['mascaraDados'].setValue('');
    this.showModal = !this.showModal;
  }

  getCustomSchemaSetting(id:number){
    this.customSchemaId = id;
    this.settingsCustomSchemasService.getCustomSchemaSetting(id)
    .subscribe(settingCustomSchema => this.setValueForm(settingCustomSchema));
    this.showModal = !this.showModal;
    this.editMode = true;
    
    



  }
}
