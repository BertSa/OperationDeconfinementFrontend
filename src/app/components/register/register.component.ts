import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserRegister} from '../../models/userRegister';
import {UserService} from '../../services/user.service';
import {TypeLicense} from '../../models/license';
import {Router} from '@angular/router';
import {state} from '@angular/animations';

export const confirmPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('confirmation');

  return password && confirmation && password.value !== confirmation.value ? {passwordMatch: true} : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string = 'Register';
  registerForm: FormGroup;
  typeMessage: string = 'Select your type of subscription';
  typeEnum = TypeLicense;

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
    console.log('oui');
    if (this.registerForm.valid) {
      let user = new UserRegister();
      user.email = this.registerForm.value.email;
      user.phone = this.registerForm.value.phone;
      user.noAssuranceMaladie = this.registerForm.value.nassm;
      user.password = this.registerForm.value.password;
      this.userService.register(user, this.registerForm.value.typeOfSubscription).subscribe(() => {
          this.router.navigateByUrl('/login').then();
        },
        error => console.log(error));

    } else {
      console.log('non valid');
    }
  }

  // noinspection JSUnusedLocalSymbols
  keys<E extends { [I in Exclude<keyof E, ''>]: I }>(enumTest: E): Exclude<keyof E, ''>[] {
    return Object.keys(TypeLicense) as Exclude<keyof E, ''>[];
  }
}
