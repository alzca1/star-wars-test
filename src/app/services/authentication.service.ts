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
  $loginStatus = new Subject()
  $wasAuthenticated

  constructor(private router: Router, private cookieService: CookieService, private userLocalStorageService: UserLocalStorageService) {
    this.isAuthenticated = false; 
  }

  setCredentials(email, password) {
    const authData = btoa(`${email}:${password}`);
    let cookieExp = new Date();
    cookieExp.setDate(cookieExp.getDate() + 7);
    this.cookieService.set('currentUser', authData, cookieExp);
  }

  login(email, password){
    const users = this.userLocalStorageService.getUsers();
    for(let user of users){
      if(user !== null && user.password === password){
        this.isAuthenticated = true; 
        this.$loginStatus.next('valid')
        this.setCredentials(email, password)
        this.router.navigate(['/ships'])
      }
        this.$loginStatus.next('invalid');
    }
  }
}
