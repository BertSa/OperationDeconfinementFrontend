import {HostListener, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegister} from '../models/userRegister';
import {TypeLicense} from '../models/license';
import {Citizen} from '../models/citizen';
import {LoginData} from '../models/loginData';
import {map} from 'rxjs/operators';
import {completeEndpoint, loginEndpoint, registerEndpoint, sessionStorageKey, sessionStorageSave, urlAPI} from '../components/env';

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
      }
      return this.user;
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
      if (user) {
        sessionStorage.setItem(sessionStorageKey, user.email);
        this.user = user;
        return this.user;
      }
    }));
  }

  saveSession() {
    if (this.isLoggedIn()) {
      let userr = JSON.stringify(this.user);
      sessionStorage.setItem(sessionStorageSave, userr);
    }
  }

  getSessionSaved(): void {
    let item = sessionStorage.getItem(sessionStorageSave);
    if (item) {
      this.user = JSON.parse(item);
    }
    sessionStorage.removeItem(sessionStorageSave);
  }
}
