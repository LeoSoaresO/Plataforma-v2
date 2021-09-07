import { Component, OnInit } from '@angular/core';
import { faImage, faUserHeadset } from '@fortawesome/pro-light-svg-icons';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

//Icons
faImage = faImage
faQuestionCircle = faQuestionCircle
faUserHeadset = faUserHeadset

//variables 
show = false
cont = false
loginForm: FormGroup;
userForm: FormGroup;
socialUser: SocialUser;
isLoggedin: boolean = false; 
title = 'msal-angular-tutorial';
isIframe = false;
loginDisplay = false;
options

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private msalservice: MsalService,
    private loginservice: LoginService
  ) { }

  ngOnInit(): void {
    this.form();
    this.firstLoad();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

  //Login Functions

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  isLogged() : boolean{
    return this.msalservice.instance.getActiveAccount() != null
  }

  loginWithMicrosoft(){
    this.msalservice.loginPopup().subscribe((response: AuthenticationResult)=> {
      this.msalservice.instance.setActiveAccount(response.account)
      console.log(this.msalservice.instance.getActiveAccount()?.name)
    });
  }

  logOutMicrosoft(){
    this.msalservice.logout();
  }

  form(){
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  //Other Functions

  toggle(){
    this.show = false;
  }

  next() {
    this.show = false;
    this.cont = true
  }
  
  validateCod(){
    this.router.navigate(['reset'])
  }

  pass() {
      var x = (<HTMLInputElement>document.getElementById('pass'));
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  //Requests 

  async authUser(){
    let e = this.userForm.controls.email.value
    let p = this.userForm.controls.password.value
    const params = {
      "e": e,
      "p": p,
    }
      console.log(params);     
  }

  async firstLoad(){
    const response = await this.loginservice.firstLoad()
    console.log(response); 
    this.options = response   
  }

}
