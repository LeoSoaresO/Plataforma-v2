import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MsalModule, MsalInterceptor, MSAL_INSTANCE, MsalService, MsalInterceptorConfiguration, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { CookieService } from 'ngx-cookie-service';


// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { ImportComponent } from './pages/import/import.component';
import { ConfigComponent } from './pages/config/config.component';
import { ConfigGeraisComponent } from './components/page.config.components/config-gerais/config-gerais.component';
import { ConfigAvancadasComponent } from './components/page.config.components/config-avancadas/config-avancadas.component';
import { ConfigCamposCustomizadosComponent } from './components/page.config.components/config-campos-customizados/config-campos-customizados.component';
import { ConfigIntegracoesComponent } from './components/page.config.components/config-integracoes/config-integracoes.component';
import { ConfigLoginComponent } from './components/page.config.components/config-login/config-login.component';

// Components
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RolesComponent } from './components/page.permissions.components/roles/roles.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CountdownModule } from 'ngx-countdown';
import { ResetComponent } from './components/reset/reset.component';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
    auth: {
      clientId: '01e2af38-0675-478b-b255-eaa4a2704b97',
      redirectUri: 'http://localhost:4200'
    }
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardComponent,
    UsersComponent,
    ProfileComponent,
    PermissionsComponent,
    ImportComponent,
    ConfigComponent,
    ConfigGeraisComponent,
    ConfigAvancadasComponent,
    ConfigCamposCustomizadosComponent,
    ConfigIntegracoesComponent,
    ConfigLoginComponent,
    RolesComponent,
    CountdownComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    CountdownModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ColorPickerModule,
    SocialLoginModule,
    MsalModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
  ],
  providers: [
    CookieService,
    MsalModule,
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    }, {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '358550703280-e4r4qc3r193f6ud4trihkvtcg6dli38l.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },   
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
