import {Component, OnInit} from '@angular/core';
import {Citizen} from '../../models/citizen';
import {UserService} from '../../services/user.service';
import {HiddenNassmPipe} from '../../pipes/hidden-nassm.pipe';
import {TypeLicense} from '../../models/license';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hidden: HiddenNassmPipe;
  user: Citizen;
  isExpired: boolean = true;
  isVaccine: boolean;

  constructor(private serviceUser: UserService) {
  }

  ngOnInit(): void {
    this.user = this.serviceUser.user;
    this.isExpired = this.licenseActive();
    this.isVaccine = this.user.license.type == TypeLicense.VACCINE;
  }


  licenseActive() {
    if (this.user.license.type === TypeLicense.VACCINE) {
      return false;
    }
    let difference = (new Date(this.user.license.dateExpire).getTime() - new Date(Date.now()).getTime());
    let number = Math.ceil(difference / (1000 * 3600 * 24));
    return number <= 0;
  }
}
