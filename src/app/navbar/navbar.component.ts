import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loginStatus: boolean;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.$loginStatus.subscribe((status) => {
      switch (status) {
        case 'valid':
          this.loginStatus = true;
          break;
        case 'invalid':
          this.loginStatus = false;
        default:
          this.loginStatus = false;
      }
    });
  }

  onLogOut() {
    this.authenticationService.removeCredentials();
  }
}
