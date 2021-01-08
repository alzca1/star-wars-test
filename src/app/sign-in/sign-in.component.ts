import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  message: string; 
  loginStatusMessage: string; 

  signInForm: FormGroup;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {

    this.authenticationService.$loginStatus.subscribe(message => {
      this.loginStatusMessage = message; 
      this.handleSignInMessage(message)
    })
    this.signInForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      }),
    });
  }

  onSubmit(){
    const {email, password}= this.signInForm.value.userData;
    this.authenticationService.login(email, password);
    this.signInForm.reset();
  }

  // implementar sistema de mensajes (igual al de signup)

  clearErrorMessage() {
    setTimeout(() => {
      this.loginStatusMessage = null;
      this.message = null;
    }, 5000);
  }


  handleSignInMessage(status){
    switch(status){
      case 'invalid': 
      this.message = 'Error: Either your username or password was incorrect'; 
      this.clearErrorMessage();
      break; 
      case 'valid': 
      this.message = "Login succesful! Please, wait while you're being redirected"
      setTimeout(() => {
        this.router.navigate(['/ships']);
        this.loginStatusMessage = null; 
        this.message = null; 
      }, 4000)
    }
  }


}
