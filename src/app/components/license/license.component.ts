import {Component, OnInit} from '@angular/core';
import {Citizen, Sex} from '../../models/citizen';
import {Address, Province} from '../../models/address';
import {CategoryLicense, License, TypeLicense} from '../../models/license';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  user: Citizen;

  constructor() {
  }

  ngOnInit(): void {
    this.user = new Citizen('sam@bertsa.ca',
      '514-777-7777',
      'dddd11112222',
      'password',
      'Samuel',
      'Bertrand', new Address('h8s3d1', '39 rue William-Macdonald', 'Montreal', Province.Quebec, '13'),
      new License(TypeLicense.VACCINE, CategoryLicense.YoungAdult, new Date(2021, 4, 3), new Date(2021, 4, 19)),
      new Date('1999/10/11'),
      Sex.MALE,
      true,
      null);
  }

  getFormattedDate(date: Date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  }

}
