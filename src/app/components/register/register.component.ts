import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegister} from '../../models/userRegister';
import {UserService} from '../../services/user.service';
import {TypeLicense} from '../../models/license';
import {Router} from '@angular/router';
import {confirmPassword, keys, swalErr} from '../../others/Utility';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string = 'Register';
  registerForm: FormGroup;
  typeMessage: string = 'Select your type of subscription';

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      nassm: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{4}[0-9]{8}')]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8)]),
      confirmation: new FormControl('', [
        Validators.required,
      ]),
      typeOfSubscription: new FormControl('', [
        Validators.required,
      ])
    }, {
      validators: confirmPassword
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let user = new UserRegister();
      user.email = this.registerForm.value.email;
      user.phone = this.registerForm.value.phone;
      user.noAssuranceMaladie = this.registerForm.value.nassm;
      user.password = this.registerForm.value.password;
      this.userService.register(user, this.registerForm.value.typeOfSubscription).subscribe(() => {
          this.router.navigateByUrl('/login').then();
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
