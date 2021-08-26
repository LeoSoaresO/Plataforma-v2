import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
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
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'reset', component: ResetComponent },
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'import', component: ImportComponent },
  { path: 'config', component: ConfigComponent ,
    children: [
      {path:'gerais', component: ConfigGeraisComponent },
      {path:'avancadas', component: ConfigAvancadasComponent },
      {path:'campos-customizados', component: ConfigCamposCustomizadosComponent },
      {path:'integracoes', component: ConfigIntegracoesComponent },
      {path:'login', component: ConfigLoginComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
