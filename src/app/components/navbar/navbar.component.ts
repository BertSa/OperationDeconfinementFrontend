import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  bod: JQuery<HTMLElement>;
  menu: JQuery<HTMLElement>;
  menuItems: JQuery<HTMLElement>;

  toggleClass = (element: JQuery<HTMLElement>, stringClass) => {
    if (element.hasClass(stringClass)) {
      element.removeClass(stringClass);
    } else {
      element.addClass(stringClass);
    }
  };

  constructor(public service: UserService) {
  }

  ngOnInit(): void {
    this.bod = $('.body-nav');
    this.menu = $('.menu-icon');
    this.menuItems = $('.nav__list-item');
    this.menu.on('click', () => {
      return this.toggleClass(this.bod, 'nav-active');
    });

  }

}
