import { Component, OnInit } from '@angular/core';
import { ShipsService } from './services/ships.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'star-wars';
  constructor(private shipsService: ShipsService){}

  ngOnInit(){
    this.shipsService.getShips(); 
  }

}
