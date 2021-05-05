import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {Error404Component} from './components/error404/error404.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LicenseComponent} from './components/license/license.component';
import {CompletionComponent} from './components/completion/completion.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'license', component: LicenseComponent},
  {path: 'login', component: LoginComponent},
  {path: 'completion', component: CompletionComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: Error404Component},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
