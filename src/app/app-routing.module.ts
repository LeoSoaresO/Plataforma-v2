import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { ImportComponent } from './pages/import/import.component';
import { ConfigComponent } from './pages/config/config.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'import', component: ImportComponent },
  { path: 'config', component: ConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
