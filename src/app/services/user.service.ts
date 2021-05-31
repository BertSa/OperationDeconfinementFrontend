import {HostListener, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegister} from '../models/userRegister';
import {TypeLicense} from '../models/license';
import {Citizen} from '../models/citizen';
import {LoginData} from '../models/loginData';
import {map} from 'rxjs/operators';
import {
  resetPasswordEndpoint,
  completeEndpoint,
  loginEndpoint,
  registerEndpoint, renewEndpoint, sendCopyEndpoint,
  sessionStorageKey,
  sessionStorageSave,
  updateAddress,
  updateEndpoint,
  updatePassword,
  updatePhone,
  urlAPI, forgotPasswordEndpoint
} from '../others/env';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @HostListener('window:load') onLoad() {
    this.saveSession();
  }


  public user: Citizen;

  constructor(protected http: HttpClient) {
  }


  register(user: UserRegister, type: TypeLicense): Observable<Citizen> {

    return this.http.post<Citizen>(urlAPI + registerEndpoint + '/' + type.toLowerCase(), user, httpOptions).pipe(map(user => {
      if (user) {
        sessionStorage.setItem(sessionStorageKey, user.email);
        this.user = user;
        return this.user;
      }
    }));
  }

  complete(user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(urlAPI + completeEndpoint, user, httpOptions).pipe(map(user => {
      if (user) {
        sessionStorage.setItem(sessionStorageKey, user.email);
        this.user = user;
        return this.user;
      }
    }));
  }

  isLoggedIn(): boolean {
    let email = sessionStorage.getItem(sessionStorageKey);
    return email != null;
  }

  isUserComplete() {
    return this.user.profileCompleted;
  }

  logout() {
    sessionStorage.clear();
  }

  login(login: LoginData) {
    return this.http.post<Citizen>(urlAPI + loginEndpoint, login, httpOptions).pipe(map(user => {
      return this.storeUser(user);
    }));
  }


  saveSession() {
    if (this.isLoggedIn()) {
      let u = JSON.stringify(this.user);
      sessionStorage.setItem(sessionStorageSave, u);
    }
  }

  getSessionSaved(): void {
    let u = sessionStorage.getItem(sessionStorageSave);
    if (u) {
      this.user = JSON.parse(u);
    }
    sessionStorage.removeItem(sessionStorageSave);
  }

  updateAddress(user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(urlAPI + updateEndpoint + updateAddress, user, httpOptions).pipe(map(user => {
      return this.storeUser(user);
    }));
  }

  updatePhone(user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(urlAPI + updateEndpoint + updatePhone, user, httpOptions).pipe(map(user => {
      return this.storeUser(user);
    }));
  }

  updatePassword(user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(urlAPI + updateEndpoint + updatePassword, user, httpOptions).pipe(map(user => {
      return this.storeUser(user);
    }));
  }

  private storeUser(user: Citizen) {
    if (user) {
      sessionStorage.setItem(sessionStorageKey, user.email);
      this.user = user;
      return this.user;
    }
    return null;
  }

  renew(type: TypeLicense, user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(urlAPI + renewEndpoint + '/' + type, user, httpOptions).pipe(map(user => {
      return this.storeUser(user);
    }));
  }

  sendCopy(user: Citizen): Observable<boolean> {
    return this.http.post<boolean>(urlAPI + sendCopyEndpoint, user, httpOptions);
  }

  reset(token: string, password): Observable<Citizen> {
    return this.http.post<Citizen>(urlAPI + resetPasswordEndpoint + '/' + token, password, httpOptions);
  }
  forgot(email: string): Observable<boolean> {
    return this.http.post<boolean>(urlAPI + forgotPasswordEndpoint, email, httpOptions);
  }
}
