import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<EventListing> {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let path = route.url[0].path.toLowerCase();
    if (!this.userService.isLoggedIn()) {
      return path.includes('login') || path.includes('register') || path.includes('pwd/change') ? true : this.router.parseUrl('/login');
    } else {
      if (path.includes('dashboard')) {
        return this.userService.isUserComplete() ? true : this.router.parseUrl('/completion');
      } else if (path.includes('completion')) {
        return this.userService.isUserComplete() ? this.router.parseUrl('/dashboard') : true;
      } else {
        return this.router.parseUrl('/dashboard');
      }
    }
  }

  async canDeactivate(component: EventListing, route: ActivatedRouteSnapshot): Promise<boolean> {
    let flag: boolean = true;

    if (!route.url[0].path.toLowerCase().includes('logout')) {
      return false;
    }
    if (component.eventListingForm.dirty) {
      await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Leave',
        cancelButtonText: 'Stay',
      }).then((result) => {
        if (result.isConfirmed) {
          flag = true;
          Swal.fire('Information are not saved', '', 'info');
        } else {
          flag = false;
        }
      });
    }
    return flag;
  }


}

export interface EventListing {
  eventListingForm: NgForm;
}
