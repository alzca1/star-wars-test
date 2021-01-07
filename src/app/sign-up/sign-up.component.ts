import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLocalStorageService } from '../services/user-local-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private UserLocalStorageService: UserLocalStorageService ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, Validators.required),
        surname: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      }),
    });
  }

  getErrorMessage() {
    if (this.signUpForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signUpForm.hasError('name') ? 'Not a valid email' : '';
  }

  onSubmit(){
   const user = this.signUpForm.value.userData; 
   console.log(user)
    this.UserLocalStorageService.createUser(user)
    this.signUpForm.reset(); 
  }


}
