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
    StoreModule.forRoot(reducers, {
      metaReducers
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
