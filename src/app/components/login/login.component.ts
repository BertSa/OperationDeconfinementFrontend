import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {sessionStorageKey} from '../../others/env';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../models/loginData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toast = Swal.mixin({
    toast: true,
    icon: 'success',
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
  });
  loginForm: FormGroup;

  constructor(private router: Router, private serviceUser: UserService) {
  }

  ngOnInit(): void {
    this.loggedIn();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      let login = new LoginData();
      login.email = this.loginForm.value.email;
      login.password = this.loginForm.value.password;


      this.serviceUser.login(login).subscribe(() => {
          this.loggedIn();
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.details[0]
          }).then();
        });
    }
  }

  forgotPassword() {
    Swal.fire({
      title: 'Reset Password',
      icon: 'warning',
      input: 'email',
      inputLabel: 'Email',
      confirmButtonText: 'Send'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        this.serviceUser.forgot(result.value).subscribe(value => {
            if (value) {
              this.toast.fire({
                title: 'Email sent!',
                text: 'You should receive an email with all information to reset your password soon.',
                timer: 3000
              }).then();
            }
          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.details[0]
            }).then();
          }
        );
      }
    });
  }

  private loggedIn() {
    if (sessionStorage.getItem(sessionStorageKey) && this.serviceUser.user && this.serviceUser.isLoggedIn()) {
      if (this.serviceUser.user.profileCompleted) {
        this.router.navigateByUrl('/dashboard').then();
      } else {
        this.router.navigateByUrl('/completion').then();
      }
    }
  }
}
