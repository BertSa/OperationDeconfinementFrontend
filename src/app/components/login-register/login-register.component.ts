import {Component, OnInit} from '@angular/core';
import {keys} from '../../others/Utility';
import {TypeLicense} from '../../models/license';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  private signInBtn: JQuery<HTMLElement>;
  private signUpBtn: JQuery<HTMLElement>;
  private fistForm: JQuery<HTMLElement>;
  private secondForm: JQuery<HTMLElement>;
  private container: Element;

  constructor() {
  }

  ngOnInit(): void {
    this.signInBtn = $('#signIn');
    this.signUpBtn = $('#signUp');
    this.fistForm = $('#form1');
    this.secondForm = $('#form2');
    this.container = document.querySelector('.container');

    this.signInBtn.on('click', () => {
      this.container.classList.remove('right-panel-active');
    });

    this.signUpBtn.on('click', () => {
      this.container.classList.add('right-panel-active');
    });

    this.fistForm.on('submit', (e) => e.preventDefault());
    this.secondForm.on('submit', (e) => e.preventDefault());

  }

  listTypeLicense() {
    return keys(TypeLicense);
  }
}
