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

import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxEditorModule } from 'ngx-editor';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeSelectModule } from 'primeng/treeselect';

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
import { OrgUnitsComponent } from './pages/org-units/org-units.component';
import { DisciplinesComponent } from './pages/disciplines/disciplines.component';

// Components
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RolesComponent } from './components/page.permissions.components/roles/roles.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CountdownModule } from 'ngx-countdown';
import { ResetComponent } from './components/reset/reset.component';
import { UploadComponent } from './components/upload/upload.component';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StudentComponent } from './pages/dashboard/student/student.component';
import { TeacherComponent } from './pages/dashboard/teacher/teacher.component';
import { NormalComponent } from './pages/dashboard/normal/normal.component';
import { ConfigDisciplinesurmasComponent } from './components/page.config.components/config-disciplines/config-disciplines.component';
import { ConfigLtiComponent } from './components/page.config.components/config-lti/config-lti.component';
import { ConfigTermsComponent } from './components/page.config.components/config-terms/config-terms.component';
import { ConfigTimetablesComponent } from './components/page.config.components/config-timetables/config-timetables.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProgressBarModule } from 'angular-progress-bar';

export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
    auth: {
      clientId: '3358de6b-4e5f-49bc-b02d-3c99bb0505cd',
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
    OrgUnitsComponent,
    ConfigDisciplinesurmasComponent,
    ConfigLtiComponent,
    ConfigTermsComponent,
    ConfigTimetablesComponent,
    DisciplinesComponent,
    UploadComponent,
    StudentComponent,
    TeacherComponent,
    NormalComponent
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
    OrganizationChartModule,
    ToastModule,
    PanelModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    NgxEditorModule,
    TooltipModule,
    OverlayPanelModule,
    TreeSelectModule,
    ProgressBarModule,
    NgCircleProgressModule.forRoot({}),
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
              '927911156726-grkvus8d17384sukkn4h743ue1mcq94s.apps.googleusercontent.com'
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
