import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {confirmPassword, swalErr} from '../../others/Utility';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  token: string;
  form: FormGroup;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.token = String(routeParams.get('token'));

    this.form = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.min(8)]),
      confirmation: new FormControl('', [
        Validators.required,
      ])
    }, {
      validators: confirmPassword
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.reset(this.token, this.form.value.password).subscribe(() => {
          this.router.navigateByUrl('/login').then();
        },
        err => {
          swalErr(err).fire().then();
        }
      );
    } else {
      swalErr('Form incomplete!').fire().then();
    }
  }
}
