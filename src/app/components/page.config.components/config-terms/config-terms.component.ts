import { Component, OnInit, OnDestroy} from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SettingsTermsService } from 'src/app/services/settings-terms.service';

@Component({
  selector: 'app-config-terms',
  templateUrl: './config-terms.component.html',
  styleUrls: ['./config-terms.component.scss']
})
export class ConfigTermsComponent implements OnInit, OnDestroy {
  settingsTerms: any = [];
  editor: Editor;
  customTermsForm: FormGroup;
  toolbar: Toolbar = [
    ['bold', 'italic','underline'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];  
  constructor(private FormBuilder: FormBuilder, private settingsTermsService: SettingsTermsService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.createTermsForm();
    this.getTermsSettings();
  }

  setValueForm(settingsTerms: any){
    console.log(settingsTerms);
    
    this.customTermsForm.controls['terms_mandatory'].setValue(settingsTerms.terms_mandatory);
    this.customTermsForm.controls['terms'].setValue(settingsTerms.terms);
  }

  getTermsSettings(){
    this.settingsTermsService.getTermsSettings()
    .subscribe(settingsTerms => this.setValueForm(settingsTerms.data));
  }

  //Forms
  createTermsForm(){
    this.customTermsForm = this.FormBuilder.group({
      terms_mandatory: ['', [Validators.required]],
      terms: ['', [Validators.required]]
    })
  }  

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  saveTerms(){
    let terms_mandatory = this.customTermsForm.controls.terms_mandatory.value;
    let terms = this.customTermsForm.controls.terms.value;
    const params = {
      "terms_mandatory": terms_mandatory,
      "terms": terms 
    }
    this.settingsTermsService.postTermsSettings(params)
    .subscribe(() => console.log(params));
  }

}
