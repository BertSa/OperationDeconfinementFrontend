import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Error404Component} from './components/error404/error404.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CompletionComponent} from './components/completion/completion.component';
import {AuthGuard} from './auth/auth.guard';
import {LogoutComponent} from './components/logout/logout.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {LoginRegisterComponent} from './components/login-register/login-register.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'completion', component: CompletionComponent, canActivate: [AuthGuard]},
  {path: 'home', component: LoginRegisterComponent, canActivate: [AuthGuard]},
  {path: 'pwd/change/:token', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Error404Component},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'canActivateTeam',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ]
})
export class AppRoutingModule {
}
