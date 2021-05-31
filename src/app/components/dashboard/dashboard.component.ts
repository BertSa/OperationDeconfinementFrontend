import {Component, OnInit} from '@angular/core';
import {Citizen} from '../../models/citizen';
import {UserService} from '../../services/user.service';
import {TypeLicense} from '../../models/license';
import Swal from 'sweetalert2';
import {Address, Province} from '../../models/address';
import {Utility} from '../../others/Utility';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toast = Swal.mixin({
    toast: true,
    icon: 'success',
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
  });
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


  async updatePhone() {
    await Swal.fire({
      title: 'Change ',
      allowOutsideClick: false,
      html: `
            <input class="form-control" id="phoneChanged" placeholder="Phone Number"
                   type="tel">`,
      preConfirm: () => {
        const phone = $('#phoneChanged').val().toString();
        if (!phone || phone == this.user.phone) {
          Swal.showValidationMessage(`Please enter a new phone number.`);
        }
        return phone;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let u = Utility.deep(this.user);
        u.phone = result.value;
        u.license = null;
        this.serviceUser.updatePhone(u).subscribe(value => {
          if (value.phone === result.value) {
            this.toast.fire({
              title: 'Phone number has been changed.'
            }).then(() => {
              this.user = this.serviceUser.user;
            });
          }
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.details[0]
          }).then();
        });
      }
    });
  }

  async updateAddress() {
    await Swal.fire({
      icon: 'warning',
      title: 'Attention!',
      text: 'This feature only support changes in Quebec.',
      showCancelButton: true,
      confirmButtonText: 'Continue',
    }).then(
      (res) => {
        if (res.isConfirmed) {
          Swal.fire({
              title: 'Change ',
              allowOutsideClick: false,
              showLoaderOnConfirm: true,
              html: `
                <div class="form-group">
                  <div class="form-row">
                    <div class="col-md-9">
                      <label for="street" class="sr-only">Street</label>
                      <input class="form-control" formControlName="street" id="street" placeholder="Street"
                        type="text">
                    </div>
                    <div class="col-md-3">
                        <label for="apt" class="sr-only">Apartment</label>
                        <input class="form-control" formControlName="apt" id="apt" placeholder="Apt"
                            type="text">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-6">
                      <label for="city" class="sr-only">City</label>
                      <input class="form-control" formControlName="city" id="city" placeholder="City"
                        type="text">
                    </div>
                    <div class="col-3">
                      <label for="zipCode" class="sr-only">ZipCode</label>
                      <input class="form-control" formControlName="zipCode" id="zipCode" placeholder="Zip"
                        type="text" maxlength="7">
                    </div>
                  </div>
               </div>`,
              preConfirm: () => {
                const values = {
                  street: $('#street').val().toString(),
                  apt: $('#apt').val().toString(),
                  city: $('#city').val().toString(),
                  zipCode: $('#zipCode').val().toString()
                };
                let address: Address = new Address(values.zipCode, values.street, values.city, Province.Quebec, values.apt);
                let u = Utility.deep(this.user);
                u.address = address;
                u.license = null;
                this.serviceUser.updateAddress(u).subscribe(() => {
                  },
                  err => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: err.error.details[0]
                    }).then();
                  });
              }
            }
          ).then((result) => {
            if (result.isConfirmed) {
              this.toast.fire({
                title: 'Address has been changed.'
              }).then(() => {
                this.user = this.serviceUser.user;
              });
            } else if (result.isDismissed) {
              this.toast.fire({
                icon: 'info',
                text: 'No changes has been made.',
              }).then();
            }

          });
        } else {
          this.toast.fire({
            icon: 'info',
            text: 'No changes has been made.',
          }).then();
        }
      }
    );

  }

  async updatePassword() {
    await Swal.fire({
      title: 'Change ',
      allowOutsideClick: false,
      html: `
            <div class="form-group mb-4">
                <label class="sr-only" for="inputPassword">Current Password</label>
                <input class="form-control" formControlName="password" id="currentPassword" placeholder="Current Password"
                       type="password">
              </div>
            </div>
            <div class="form-group mb-4">
                <label class="sr-only" for="inputPassword">Password</label>
                <input class="form-control mb-2" formControlName="password" id="password" placeholder="Password"
                       type="password">
                <label class="sr-only" for="inputConfirmPassword">Confirm password</label>
                <input class="form-control" formControlName="confirmation" id="confirmation"
                       placeholder="Confirm password" type="password">
            </div>`,
      preConfirm: () => {
        const currentPassword = $('#currentPassword').val().toString();
        const password = $('#password').val().toString();
        const confirmation = $('#confirmation').val().toString();
        if (!currentPassword || !password || !confirmation) {
          Swal.showValidationMessage(`Please fill up every field.`);
        }
        if (currentPassword !== this.user.password) {
          Swal.showValidationMessage(`Current password incorrect!`);
        }
        if (password !== confirmation) {
          Swal.showValidationMessage(`Both inputs must match!`);
        }
        return password;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let u = Utility.deep(this.user);
        u.password = result.value;
        u.license = null;
        this.serviceUser.updatePassword(u).subscribe(u => {
          if (u.password === result.value) {
            this.toast.fire({
              title: 'Password has been changed.'
            }).then(() => {
              this.user = this.serviceUser.user;
            });
          }
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.details[0]
          }).then();
        });
      }
    });
  }

  renew() {
    Swal.fire({
      title: 'Renew',
      showDenyButton: true,
      denyButtonText: 'Vaccine',
      confirmButtonText: 'Negative test',
    }).then((result) => {
      if (result.isConfirmed || result.isDenied) {
        let type = (result.isConfirmed) ? TypeLicense.NEGATIVETEST : TypeLicense.VACCINE;
        let u = Utility.deep(this.user);
        u.license = null;
        this.serviceUser.renew(type, u).subscribe(u => {
          if (u.password === result.value) {
            this.toast.fire({
              title: 'Licence renewed!',
              text: 'You should receive an email with your license soon.',
              timer: 3000
            }).then(() => {
              this.user = this.serviceUser.user;
            });
          }
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.details[0]
          }).then();
        });
      }
    });
  }
  sendCopy(){
    let u = Utility.deep(this.user);
    u.license = null;
    this.serviceUser.sendCopy(u).subscribe(response => {
      if(response){
        this.toast.fire({
          title: 'New license sent!',
          text: 'You should receive an email with your license soon.',
          timer: 3000
        }).then();
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.details[0]
      }).then();
    })
  }
}
