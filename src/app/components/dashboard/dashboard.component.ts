import {Component, OnInit} from '@angular/core';
import {Sex, User} from '../../models/user';
import {Address} from '../../models/address';
import {CategoryLicense, License, TypeLicense} from '../../models/license';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor() {
  }

  ngOnInit(): void {
    this.user = new User('sam@bertsa.ca',
      '514-777-7777',
      'dddd11112222',
      'password',
      'Samuel',
      'Bertrand', new Address('h8s3dac2', '39fafaef0 rue William-Macdonald', 'Lachinafsfeeae', 'qafefsc', '13'),
      new License(TypeLicense.Negative_Test, CategoryLicense.YoungAdult, new Date(2021, 4, 3), new Date(2021, 4, 15)),
      new Date("1999/10/11"),
      Sex.MALE);
  }

  getTimeLeft() {
    if (this.user?.license?.type===TypeLicense.Vaccine)
      return "Permanent"
    let difference = (this.user?.license?.dateExpire.getTime() - new Date(Date.now()).getTime());
    return Math.ceil(difference / (1000 * 3600 * 24))+"day(s) lefts";
  }

  getUserBirth() {
    let birth = this.user?.birth;
    return birth.getFullYear()+"/"+(birth.getMonth()+1)+"/"+birth.getDate()
  }
}