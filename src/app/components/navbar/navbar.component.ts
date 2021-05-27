import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service: UserService) {
  }

  ngOnInit(): void {
    $('a.menu__link').on('click', () => {
      $('#main-navigation-toggle').prop('checked', false);
    });
  }
}
