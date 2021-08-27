import { Component, OnInit } from '@angular/core';
import { faImage, faUserHeadset } from '@fortawesome/pro-light-svg-icons';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

//Icons
faImage = faImage
faQuestionCircle = faQuestionCircle
faUserHeadset = faUserHeadset

//Variables
dontMatch
match

  constructor() { }

  ngOnInit(): void {
  }

  pass() {
    var x = (<HTMLInputElement>document.getElementById('pass'));
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }

  passConfirm() {
    var x = (<HTMLInputElement>document.getElementById('confirm'));
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }

  passMatch() {
    var password = (<HTMLInputElement>document.getElementById('pass'));
    var confirm_password = (<HTMLInputElement>document.getElementById('confirm'));

    if(password.value != confirm_password.value) {
      console.log('não foi');        
      this.dontMatch = true
    } else {
      confirm_password.setCustomValidity('');
      console.log('foi'); 
    }
  }

}
