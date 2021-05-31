import Swal from 'sweetalert2';
import {TypeLicense} from '../models/license';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const deepCopy = <T extends object>(source: T): T => {
  return JSON.parse(JSON.stringify(source));
};

export const swalErr = (err) => Swal.mixin({
  icon: 'error',
  title: 'Oops...',
  text: err.error.details[0]
});
export const toast = Swal.mixin({
  toast: true,
  icon: 'success',
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
});

// noinspection JSUnusedLocalSymbols
export const keys = <E>(enumTest: E): Exclude<keyof E, ''>[] => {
  return Object.keys(enumTest) as Exclude<keyof E, ''>[];
};

export const confirmPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('confirmation');

  return password && confirmation && password.value !== confirmation.value ? {passwordMatch: true} : null;
};
