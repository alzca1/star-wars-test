import { Component, OnInit } from '@angular/core';
import { ShipsService } from './services/ships.service';
import { UserLocalStorageService } from './services/user-local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'star-wars';
  constructor(private shipsService: ShipsService, private UserLocalStorageService: UserLocalStorageService){}

  ngOnInit(){
    this.shipsService.getShips(); 
  }

}
