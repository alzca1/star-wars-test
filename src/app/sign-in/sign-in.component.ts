import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      }),
    });
  }

  onSubmit(){
    console.log(this.signInForm);
    this.signInForm.reset();
  }
}
