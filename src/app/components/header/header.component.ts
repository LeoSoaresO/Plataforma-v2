import { Component,  OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
  }

  checkUser(){
    if(this.cookieService.check('userNormal')){
      this.logOutNormal = true
      this.logOutGoogle = false
      this.logOutMicro = false
      console.log('normal no cookie');      
    }
    if(this.cookieService.check('userGoogle')){
      this.logOutNormal = false
      this.logOutGoogle = true
      this.logOutMicro = false
      console.log('google no cookie'); 
    }
    if(this.cookieService.check('userMicro')){
      this.logOutNormal = false
      this.logOutGoogle = false
      this.logOutMicro = true
      console.log('microsoft no cookie'); 
    }
    if(this.cookieService.check('logOut')){
      this.router.navigate([''])
    }
  }

  logOutG(): void {
    this.cookieService.delete('userGoogle');
    this.cookieService.set('logOut', 'true') 
    this.socialAuthService.signOut();
    console.log('google deletado, logOut concluído');
    this.checkUser();
  }

  logOutM(): void {
    this.cookieService.delete('userMicro');
    this.cookieService.set('logOut', 'true')
    this.msalservice.logout();
    console.log('microsoft deletado, logOut concluído'); 
    this.checkUser();
  }

  logOutN(): void {
    this.cookieService.delete('userNormal');
    this.cookieService.set('logOut', 'true')
    console.log('normal deletado, logOut concluído');    
    this.checkUser();
  }

}
