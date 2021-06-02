import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {Error404Component} from './components/error404/error404.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LogoutComponent} from './components/logout/logout.component';
import {CompletionComponent} from './components/completion/completion.component';
import {UserService} from './services/user.service';
import {AuthGuard} from './auth/auth.guard';
import {HiddenNassmPipe} from './pipes/hidden-nassm.pipe';
import {PhonePipe} from './pipes/phone.pipe';
import {AddressPipe} from './pipes/address.pipe';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TimeleftPipe} from './pipes/timeleft.pipe';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {LoginRegisterComponent} from './components/login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Error404Component,
    LogoutComponent,
    CompletionComponent,
    HiddenNassmPipe,
    PhonePipe,
    AddressPipe,
    NavbarComponent,
    TimeleftPipe,
    ChangePasswordComponent,
    LoginRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
