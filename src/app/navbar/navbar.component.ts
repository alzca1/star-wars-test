import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginStatus: boolean; 
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.$loginStatus.subscribe(status => {
      status == 'valid'?  this.loginStatus = true : false;  
    })
   }

  ngOnInit(): void {
    console.log('ngOnInit')
    
  }

  checkLoggedIn(){

  }

  onLogOut(){
    this.authenticationService.removeCredentials()
  }

}
