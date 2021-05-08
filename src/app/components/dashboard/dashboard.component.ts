import {Component, OnInit} from '@angular/core';
import {Citizen, Sex} from '../../models/citizen';
import {Address, Province} from '../../models/address';
import {CategoryLicense, License, TypeLicense} from '../../models/license';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Citizen;

  constructor() {
  }

  ngOnInit(): void {
    this.user = new Citizen('sam@bertsa.ca',
      '514-777-7777',
      'dddd11112222',
      'password',
      'Samuel',
      'Bertrand', new Address('h8s3dac2', '39fafaef0 rue William-Macdonald', 'Lachinafsfeeae', Province.Quebec, '13'),
      new License(TypeLicense.NEGATIVETEST, CategoryLicense.YoungAdult, new Date(2021, 4, 3), new Date(2021, 4, 15)),
      new Date('1999/10/11'),
      Sex.MALE,
      true,
      null);
  }

  getUserBirth() {
    let birth = this.user?.birth;
    return birth.getFullYear() + '/' + (birth.getMonth() + 1) + '/' + birth.getDate();
  }
}
