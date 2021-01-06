import { Component, Input, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
})
export class ShipComponent implements OnInit {
 
  constructor(private shipsService: ShipsService) {}

  @Input() ship: any; 

  ngOnInit(): void {}

  onFetchImageLink(url){
    return this.shipsService.fetchImageLink(url)
  }
}



