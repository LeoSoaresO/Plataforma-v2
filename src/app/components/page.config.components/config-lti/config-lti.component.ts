import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { SettingsLtiService } from 'src/app/services/settings-lti.service';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-config-lti',
  templateUrl: './config-lti.component.html',
  styleUrls: ['./config-lti.component.scss'],
  providers:[ConfirmationService]
})
export class ConfigLtiComponent implements OnInit {
  settingsLti: any = [];
  showModal: boolean;
  showModalDelete: boolean;
  ltiForm: FormGroup;
  success = false;
  settingCustomSchema: any = [];
  tipoContainer: any = ['window', 'iframe'];
  editMode: boolean;
  ltiId: number;
  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes

  ref: DynamicDialogRef;

  constructor(
    private settingsLtiService: SettingsLtiService,
    private FormBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.getLtiSettings();
    this.createLtiForm();
    this.primengConfig.ripple = true;
  }
  
  //Forms
  createLtiForm(){
    this.ltiForm = this.FormBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]],
      consumer_key: ['', [Validators.required]],
      secret: ['', [Validators.required]],
      custom_parameters: ['', [Validators.required]],
      container: ['', [Validators.required]],
      share_name: ['', [Validators.required]],
      share_email: ['', [Validators.required]],
      tipoContainer: ['']
    })
  }

  changetipoContainer(e: any) {
    this.tipoContainer.setValue(e.target.value, {
      onlySelf: true
    })
  }


  getLtiSettings() {
    this.settingsLtiService.getLtiSettings()
    .subscribe(settingsLti => this.settingsLti = settingsLti);
  }

  postLtiSettings(){
    let name = this.ltiForm.controls.name.value
    let description = this.ltiForm.controls.description.value
    let url = this.ltiForm.controls.url.value
    let consumer_key = this.ltiForm.controls.consumer_key.value
    let secret = this.ltiForm.controls.secret.value
    let custom_parameters = this.ltiForm.controls.custom_parameters.value
    let container = this.ltiForm.controls.container.value
    let share_name = this.ltiForm.controls.share_name.value
    let share_email = this.ltiForm.controls.share_email.value
    const params = {
      "name": name,
      "description": description,
      "url": url,
      "consumer_key": consumer_key,
      "secret": secret,
      "custom_parameters": custom_parameters,
      "container": container,
      "share_name": share_name,
      "share_email": share_email
    }

    if (this.editMode) {
      this.editMode = false;
      this.settingsLtiService.updatetLtiSetting(this.ltiId, params)
      .subscribe(() => console.log(this.settingsLti));
    }else{
      this.settingsLtiService.postLtiSettings(params)
      .subscribe(() => console.log(this.settingsLti));
    }

  }

  remove(id: number) {
      this.confirmationService.confirm({
          header: 'Deseja excluir?',
          accept: () => {
            this.settingsLtiService.delLtiSettings(id)
            .subscribe(() => console.log(this.settingsLti));
          },
          reject: () => {

          }
      });
  }

  delLtiSettings(id: number){
    this.settingsLtiService.delLtiSettings(id)
    .subscribe(() => console.log(this.settingsLti));
  }

  setValueForm(settingsLti: any){
    this.ltiForm.controls['name'].setValue(settingsLti.name);
    this.ltiForm.controls['url'].setValue(settingsLti.url);
    this.ltiForm.controls['description'].setValue(settingsLti.description);
    this.ltiForm.controls['consumer_key'].setValue(settingsLti.consumer_key);
    this.ltiForm.controls['secret'].setValue(settingsLti.secret);
    this.ltiForm.controls['tipoContainer'].setValue(settingsLti.container);
  }

  openModal(){
    this.ltiForm.controls['name'].setValue('');
    this.ltiForm.controls['url'].setValue('');
    this.ltiForm.controls['description'].setValue('');
    this.ltiForm.controls['consumer_key'].setValue('');
    this.ltiForm.controls['secret'].setValue('');
    this.ltiForm.controls['tipoContainer'].setValue('');
    this.showModal = !this.showModal;
  }

  getLtiSetting(id:number){
    this.ltiId = id;
    this.settingsLtiService.getLtiSetting(id)
    .subscribe(settingLti => this.setValueForm(settingLti));
    this.showModal = !this.showModal;
    this.editMode = true;
  }

}
