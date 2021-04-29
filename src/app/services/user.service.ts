import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegister} from '../models/userRegister';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: 'http://localhost:9333/register';

  constructor(protected http: HttpClient) {
  }

  registerVaccine(t: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(this.url + '/register/vaccine', t, httpOptions);
  }

  registerNegativeTest(t: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(this.url + '/register/negative', t, httpOptions);
  }

  isLoggedIn(): boolean {
    let email = sessionStorage.getItem('email');
    return email != null;
  }

  logout() {
    sessionStorage.clear();
  }
}
