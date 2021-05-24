import {Component, OnInit} from '@angular/core';
import {Citizen} from '../../models/citizen';
import {UserService} from '../../services/user.service';
import {DatePipe} from '@angular/common';
import {HiddenNassmPipe} from '../../pipes/hidden-nassm.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hidden:HiddenNassmPipe;
  user: Citizen;

  constructor(private serviceUser: UserService) {
  }

  ngOnInit(): void {
    // this.user = new Citizen('sam@bertsa.ca',
    //   '514-777-7777',
    //   'dddd11112222',
    //   'password',
    //   'Samuel',
    //   'Bertrand', new Address('h8s3dac2', '39fafaef0 rue William-Macdonald', 'Lachinafsfeeae', Province.Quebec, '13'),
    //   new License(TypeLicense.NEGATIVETEST, CategoryLicense.YoungAdult, new Date(2021, 4, 3), new Date(2021, 4, 15)),
    //   new Date('1999/10/11'),
    //   Sex.MALE,
    //   true,
    //   null);
    this.user = this.serviceUser.user;
  }

  getUserBirth() {
    let birth = this.user?.birth;

    console.log(this.user.birth);
    console.log(birth);
    return birth.getFullYear() + '/' + (birth.getMonth() + 1) + '/' + birth.getDate();
  }
}
