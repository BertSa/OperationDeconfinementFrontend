import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRegister} from '../models/userRegister';
import {TypeLicense} from '../models/license';
import {Citizen} from '../models/citizen';
import {map} from 'rxjs/operators';
import {sessionStorageKey} from '../components/env';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:9333/api/user';
  public user: Citizen;

  constructor(protected http: HttpClient) {
  }

  register(user: UserRegister, type: TypeLicense): Observable<Citizen> {

    return this.http.post<Citizen>(this.url + '/register/' + type.toLowerCase(), user, httpOptions).pipe(map(user => {
      if (user) {
        sessionStorage.setItem(sessionStorageKey, user.email);
        this.user = user;
      }

      return this.user;
    }));
  }

  complete(user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(this.url + '/complete', user, httpOptions);
  }

  isLoggedIn(): boolean {
    let email = sessionStorage.getItem(sessionStorageKey);
    return email != null;
  }

  logout() {
    sessionStorage.clear();
  }
}
