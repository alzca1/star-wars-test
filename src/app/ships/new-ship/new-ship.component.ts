import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserLocalStorageService } from 'src/app/services/user-local-storage.service';

@Component({
  selector: 'app-new-ship',
  templateUrl: './new-ship.component.html',
  styleUrls: ['./new-ship.component.scss'],
})
export class NewShipComponent implements OnInit {
  newShipForm: FormGroup;

  constructor(
    private userLocalStorageService: UserLocalStorageService,
    private authenticationService: AuthenticationService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newShipForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      starship_class: new FormControl(null, Validators.required),
      manufacturer: new FormControl(null, Validators.required),
      cost_in_credits: new FormControl(null, Validators.required),
      length: new FormControl(null, Validators.required),
      crew: new FormControl(null, Validators.required),
      passengers: new FormControl(null, Validators.required),
      max_atmosphering_speed: new FormControl(null, Validators.required),
      hyperdrive_rating: new FormControl(null, Validators.required),
      MGLT: new FormControl(null, Validators.required),
      cargo_capacity: new FormControl(null, Validators.required),
      consumables: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const ship = this.newShipForm.value;
    let userEmail = this.authenticationService.getCurrentUser()[0];
    this.userLocalStorageService.addShipToUserLocalStorage(userEmail, ship);
    this.router.navigate(['/ships'])
  }

  
}
