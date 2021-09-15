import { Component, OnInit } from '@angular/core';
import { faImage, faUserHeadset } from '@fortawesome/pro-light-svg-icons';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
options

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,    
  ) { }

  ngOnInit(): void {
    this.firstLoad();
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
      this.cookieService.set('pass', JSON.stringify(confirm_password.value))
      this.updatePassword()
    }
  }

  async updatePassword(){
    let p =  this.cookieService.get('pass')
    let e =  this.cookieService.get('email')
    let t =  this.cookieService.get('token')
    let pass = JSON.parse(p)
    let email = JSON.parse(e)
    let token = JSON.parse(t)
    const params = {
      "email": email,
      "password": pass,
      "token": token
    }
    const response = await this.loginService.updatePassword(params)
    console.log(response);
    if(response == null){
      console.log('it works');      
      this.router.navigate([''])
    }
  }

  async firstLoad(){
    const response = await this.loginService.firstLoad()
    console.log(response); 
    this.options = response   
  }

}
