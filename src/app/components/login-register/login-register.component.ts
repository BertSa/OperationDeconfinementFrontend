import {Component, OnInit} from '@angular/core';
import {confirmPassword, keys, swalErr, toast} from '../../others/Utility';
import {TypeLicense} from '../../models/license';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {LoginData} from '../../models/loginData';
import Swal from 'sweetalert2';
import {sessionStorageKey} from '../../others/env';
import {UserRegister} from '../../models/userRegister';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  private signInBtn: JQuery<HTMLElement>;
  private signUpBtn: JQuery<HTMLElement>;
  private fistForm: JQuery<HTMLElement>;
  private secondForm: JQuery<HTMLElement>;
  private container: Element;
  loginForm: FormGroup;
  registerForm: FormGroup;
  typeMessage: string = 'Select your type of subscription';

  constructor(private router: Router, private serviceUser: UserService) {
  }

  ngOnInit(): void {
    this.signInBtn = $('#signIn');
    this.signUpBtn = $('#signUp');
    this.fistForm = $('#form1');
    this.secondForm = $('#form2');
    this.container = document.querySelector('.container');

    this.signInBtn.on('click', () => {
      this.container.classList.remove('right-panel-active');
    });

    this.signUpBtn.on('click', () => {
      this.container.classList.add('right-panel-active');
    });

    this.fistForm.on('submit', (e) => e.preventDefault());
    this.secondForm.on('submit', (e) => e.preventDefault());

    this.loggedIn();

    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email]),
      loginPassword: new FormControl('', [Validators.required])
    });


    this.registerForm = new FormGroup({
      registerEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      registerPhone: new FormControl('', [
        Validators.required
      ]),
      registerNassm: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{4}[0-9]{8}')]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8)]),
      confirmation: new FormControl('', [
        Validators.required,
      ]),
      registerTypeOfSubscription: new FormControl('', [
        Validators.required,
      ])
    }, {
      validators: confirmPassword
    });
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      let login = new LoginData();
      login.email = this.loginForm.value.loginEmail;
      login.password = this.loginForm.value.loginPassword;

      this.serviceUser.login(login).subscribe(() => {
          this.loggedIn();
        },
        err => {
          swalErr(err).fire().then();
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
        this.serviceUser.forgot(result.value).subscribe(value => {
            if (value) {
              toast.fire({
                title: 'Email sent!',
                text: 'You should receive an email with all information to reset your password soon.',
              }).then();
            }
          }, err => {
          console.log(err);
            swalErr(err).fire().then();
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


  onSubmit() {
    if (this.registerForm.valid) {
      let user = new UserRegister();
      user.email = this.registerForm.value.registerEmail;
      user.phone = this.registerForm.value.registerPhone;
      user.noAssuranceMaladie = this.registerForm.value.registerNassm;
      user.password = this.registerForm.value.password;
      this.serviceUser.register(user, this.registerForm.value.registerTypeOfSubscription).subscribe(() => {
          this.router.navigateByUrl('/completion').then();
        },
        err => {
          swalErr(err).fire().then();
        }
      );

    } else {
      swalErr('Form incomplete!').fire().then();
    }
  }

  listTypeLicense() {
    return keys(TypeLicense);
  }
}
