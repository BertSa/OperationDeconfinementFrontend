import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {confirmPassword} from '../register/register.component';
import {CompletionComponent} from '../completion/completion.component';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      phone: new FormControl('', [
        Validators.required
      ])
    }, {
      validators: confirmPassword
    });
  }

  onSubmit() {

  }

  keys() {
    return CompletionComponent.keys(CompletionComponent.provinceEnum);
  }
}
