import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {toast} from '../../others/Utility';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.logout();
    this.router.navigateByUrl('/home').then(() => {
      toast.fire({title: 'Successfully logged out!'}).then();
    });
  }

}
