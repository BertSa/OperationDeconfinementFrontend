import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserRegister} from '../../models/userRegister';
import {UserService} from '../../services/user.service';

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
  vaccine: string = 'vaccine';
  negativeTest: string = 'negativeTest';

  constructor(private userService: UserService) {
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
      nam: new FormControl('', [
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
      user.phone =this.registerForm.value.phone;
      user.NAM = this.registerForm.value.NAM;
      user.password = this.registerForm.value.password;
      if (this.registerForm.value.typeOfSubscription === this.vaccine) {
        this.userService.registerVaccine(user).subscribe(value => {

          },
          error => console.log(error));
      } else if (this.registerForm.value.typeOfSubscription === this.negativeTest) {
        this.userService.registerNegativeTest(user).subscribe(value => {

          },
          error => console.log(error));
      }
    } else {
      console.log('non valid');
    }
  }
}
