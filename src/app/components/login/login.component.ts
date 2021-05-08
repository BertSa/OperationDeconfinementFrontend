import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {sessionStorageKey} from '../env';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private serviceUser: UserService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem(sessionStorageKey) && this.serviceUser.user) {
      if (this.serviceUser.user.profileCompleted) {
        this.router.navigateByUrl('/dashboard').then();
      } else {
        this.router.navigateByUrl('/completion').then();
      }
    }
  }

}
