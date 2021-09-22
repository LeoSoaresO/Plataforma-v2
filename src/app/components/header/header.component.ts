import { Component,  OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { faDoorOpen } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

//Variables
logOutNormal: boolean = false
logOutMicro: boolean = false
logOutGoogle: boolean = false
user
name

//Icons
faDoorOpen = faDoorOpen

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private msalservice: MsalService,
    private loginservice: LoginService,
    private cookieService: CookieService
  ) {
 
   }

  ngOnInit(): void {
    this.checkUser()
    this.getUser()
  }

  checkUser(){
    if(this.cookieService.check('userNormal')){
      this.logOutNormal = true
      this.logOutGoogle = false
      this.logOutMicro = false  
    }
    if(this.cookieService.check('userGoogle')){
      this.logOutNormal = false
      this.logOutGoogle = true
      this.logOutMicro = false
    }
    if(this.cookieService.check('userMicro')){
      this.logOutNormal = false
      this.logOutGoogle = false
      this.logOutMicro = true
    }
    if(this.cookieService.check('logOut')){
      this.router.navigate([''])
    }
  }

  logOutG(): void {
    this.cookieService.delete('userGoogle');
    this.cookieService.set('logOut', 'true') 
    this.socialAuthService.signOut();
    this.checkUser();
  }

  logOutM(): void {
    this.cookieService.delete('userMicro');
    this.cookieService.set('logOut', 'true')
    this.msalservice.logout();
    this.checkUser();
  }

  logOutN(): void {
    this.cookieService.delete('userNormal');
    this.cookieService.set('logOut', 'true')
    this.checkUser();
  }

  getUser(){
    if(this.cookieService.check('userNormal') && !this.cookieService.check('userGoogle')){
      let data = this.cookieService.get('userNormal')
      this.user = jwt_decode(data);   
      this.letter()
    }
    if(!this.cookieService.check('userNormal') && this.cookieService.check('userGoogle')){
      let data = this.cookieService.get('userGoogle')
      this.user = jwt_decode(data);
      this.letter()
    }
  }

  letter() {
    let name = this.user.name;
    let initials = name.charAt(0);
    this.name = initials;
  }

}
