import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserLocalStorageService } from '../services/user-local-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  message: string;
  existentUserMessage: string;
  signUpForm: FormGroup;
  constructor(
    private userLocalStorageService: UserLocalStorageService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, Validators.required),
        surname: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      }),
    });
    this.userLocalStorageService.$existentUserMessage.subscribe((message) => {
      this.existentUserMessage = message;
      this.handleRegistrationMessage(message);
    });
  }

  onSubmit() {
    const user = this.signUpForm.value.userData;
    if (this.message == 'valid') {
      this.signUpForm.reset();
    }
    this.userLocalStorageService.createUser(user);
    if (this.existentUserMessage === 'valid') {
      this.authenticationService.setCredentials(user.email, user.password);
    }
  }

  clearErrorMessage() {
    setTimeout(() => {
      this.existentUserMessage = null;
      this.message = null;
    }, 5000);
  }

  handleRegistrationMessage(status) {
    switch (status) {
      case 'invalid':
        this.message = 'Error : E-mail already registered in our database.';
        this.clearErrorMessage();
        break;
      case 'valid':
        this.message =
          "Registration successful! Please, wait while you're being redirected...";
        setTimeout(() => {
          this.router.navigate(['/ships']);
          this.existentUserMessage = null;
          this.message = null;
        }, 4000);
    }
  }
}
