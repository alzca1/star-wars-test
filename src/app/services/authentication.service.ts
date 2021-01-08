import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { UserLocalStorageService } from './user-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: boolean;
  $loginStatus = new Subject<string>();
  $wasAuthenticated;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userLocalStorageService: UserLocalStorageService
  ) {
    this.isAuthenticated = false;
  }

  setCredentials(email, password) {
    const authData = btoa(`${email}:${password}`);
    let cookieExp = new Date();
    cookieExp.setDate(cookieExp.getDate() + 7);
    this.cookieService.set('currentUser', authData, cookieExp);
  }

  login(email, password) {
    const users = this.userLocalStorageService.getUsers();
    if (!users.length) {
      this.$loginStatus.next('invalid');
      return;
    }

    for (let user of users) {
      if (user.email === email && user.password === password) {
        this.isAuthenticated = true;
        this.$loginStatus.next('valid');
        this.setCredentials(email, password);
        return;
      }
    }
    this.$loginStatus.next('invalid');
  }

  checkLoggedIn() {
    let authData = this.getCurrentUser();
    if (!authData.length) {
      this.$loginStatus.next('invalid');
      return false;
    }
    const users = this.userLocalStorageService.getUsers();
    for (let user of users) {
      if (
        user !== null &&
        user.email === authData[0] &&
        user.password === authData[1]
      ) {
        this.$loginStatus.next('valid');
        return true;
      }
    }
  }

  getCurrentUser() {
    const authData = atob(this.cookieService.get('currentUser')).split(':');
    return authData;
  }

  removeCredentials() {
    this.$loginStatus.next('invalid');
    this.cookieService.deleteAll('/');
    this.router.navigateByUrl('');
  }
}
