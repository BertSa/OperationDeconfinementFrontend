import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Address, Province} from '../../models/address';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import {EventListing} from '../../auth/auth.guard';
import {keys, swalErr} from '../../others/Utility';
import {Citizen} from '../../models/citizen';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css']
})
export class CompletionComponent implements OnInit, EventListing {
  @ViewChild('eventForm') public eventListingForm: NgForm;

  title: string = 'Complete your information';
  completionForm: FormGroup;

  tutorNeeded: boolean = false;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.tutorNeeded = this.userService.isTutorNeeded();
    this.setForm();
  }

  get values() {
    return this.completionForm.value;
  }

  onSubmit() {
    if (this.completionForm.valid) {
      let user = this.userService.user;
      user.address = new Address(
        this.values.street,
        this.values.city,
        this.values.province,
        this.values.zipCode,
        this.values.apt,
      );
      let citizen = new Citizen();
      citizen.firstName = this.values.firstname;
      citizen.lastName = this.values.lastName;
      citizen.email = this.values.email;
      citizen.phone = this.values.firstname;
      user.tutor = citizen;

      this.userService.complete(user).subscribe(
        () => {
          if (this.userService.isUserComplete()) {
            this.router.navigateByUrl('/dashboard').then(
              () => {
                Swal.fire({
                  title: 'Welcome!',
                  text: 'You should receive your license on the email you give!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Continue'
                }).then();
              },
              err => {
                swalErr(err).fire().then();
              }
            );
          }
        }, err => {
          swalErr(err).fire().then();
        }
      );
    }
  }

  ProvincesList() {
    return keys(Province);
  }

  private setForm() {
    this.completionForm = new FormGroup({
      street: new FormControl('', [
        Validators.required,
      ]),
      apt: new FormControl(),
      city: new FormControl('', [
        Validators.required]),
      province: new FormControl('', [
        Validators.required,
      ]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^([A-Za-z]\\s?[0-9]){3}$')
      ]),
      firstname: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
      lastname: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
      email: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
      phone: new FormControl({disabled: !this.tutorNeeded, value: ''}, [
        Validators.required,
      ]),
    });
  }
}
