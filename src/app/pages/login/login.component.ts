import { Component, OnInit } from '@angular/core';
import { faImage, faUserHeadset } from '@fortawesome/pro-light-svg-icons';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

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
reset: FormGroup
token: FormGroup
socialUser: SocialUser;
isLoggedin: boolean = false; 
title = 'msal-angular-tutorial';
isIframe = false;
loginDisplay = false;
options
gUser
mUser
apiResp
error

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private msalservice: MsalService,
    private loginservice: LoginService,
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.form();
    this.firstLoad();
    this.resetForm();
    this.validationForm()
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      this.setGoogleCredencials();
    });
  }

  //Login Functions

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.cookieService.delete('userGoogle');
  }

  isLogged() : boolean{
    return this.msalservice.instance.getActiveAccount() != null
  }

  loginWithMicrosoft(){
    this.msalservice.loginPopup().subscribe((response: AuthenticationResult)=> {
      this.msalservice.instance.setActiveAccount(response.account)
      console.log(this.msalservice.instance.getActiveAccount());
      if (this.msalservice.instance.getActiveAccount()){
        this.callProfile();
      }
    });
  }

  form(){
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  resetForm(){
    this.reset = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  validationForm(){
    this.token = this.formBuilder.group({
      token: ['', Validators.required]
    })
  }

  //Other Functions

  setGoogleCredencials(){
    this.cookieService.set('userGoogle', JSON.stringify(this.socialUser.authToken));
      let data =  this.cookieService.get('userGoogle')
      this.gUser = JSON.parse(data)
      console.log(this.gUser)
      this.checkGoogleUser();
  }

  checkGoogleUser(){
    if (this.gUser){
      console.log('o google está1 no cookie');
      this.authGoogle();     
    } else {
      console.log('não tem nada no cookie'); 
      this.cookieService.set('logOut', 'true')
    }
  }

  toggle(){
    this.show = false;
  }

  next() {
    this.show = false;
    this.resetPassword();
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
      "user": e,
      "password": p,
    }
      console.log(params);   
      
    const response = await this.loginservice.login(params)
    console.log(response);
    if (response) {
      this.cookieService.set('userNormal', JSON.stringify(response.token));
      this.cookieService.delete('logOut')
      this.router.navigate(['dashboard'])
    }
  }

  async authGoogle(){
    console.log(this.gUser);
    const params = {
      "token": this.gUser
    }
    const response = await this.loginservice.loginWithGoogle(params)
    console.log(response);
    if (response) {
      this.cookieService.delete('logOut')
      this.router.navigate(['dashboard'])
    }
  }

  async authMicro(){
    const params = {
      "token": this.mUser.accessToken
    }
    const response = await this.loginservice.loginWithMicrosoft(params)
    console.log(response);
    if (response) {
      this.cookieService.set('userMicro', JSON.stringify(response.token));
      this.cookieService.delete('logOut')
      this.router.navigate(['dashboard'])
    }
  }

  async firstLoad(){
    this.cookieService.set('logOut', 'true')
    this.cookieService.delete('userGoogle')
    if(!this.cookieService.check('logOut')){
      this.router.navigate(['dashboard']);
    }

    const response = await this.loginservice.firstLoad()
    console.log(response); 
    this.options = response   
  }

  async resetPassword(){
    let e = this.reset.controls.email.value
    this.cookieService.set('email', JSON.stringify(e))
    const params = {
      "email" : e 
    }
    const response = await this.loginservice.resetPassword(params)
    console.log(response);
    if(response == null){
      this.cont = true
    }
  }

  async validationToken(){
    let t = this.token.controls.token.value
    let data =  this.cookieService.get('email')
    let e = JSON.parse(data)
    const params = {
      "token" : t,
      "email": e
    }
    const response = await this.loginservice.resetToken(params)
    console.log(response);
    this.cookieService.set('token', JSON.stringify(t))
    if(response) {
      this.router.navigate(['reset'])
    }  
  }

  callProfile(){
    const requestObj = {
      scopes: ["user.read"]
  };
  
  this.msalservice.acquireTokenSilent(requestObj)
  .toPromise()
  .then( (tokenResponse) => {
    this.mUser = tokenResponse
    console.log(this.mUser.accessToken);
      this.authMicro();
  }).catch(function (error) {
      console.log(error);
  });  
  }

}


