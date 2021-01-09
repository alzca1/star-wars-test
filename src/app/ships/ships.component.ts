import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { ShipsService } from '../services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  @Input() ship: any;

  ships = [];
  userShips; 
  nextUrl: string;
  previousUrl: string;
  constructor(
    private shipsService: ShipsService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userShips = this.shipsService.fetchUserShips()
    this.shipsService.getShips().subscribe((response) => {
      this.ships = response.results;
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
    });
    this.onIncludeCustomShips(this.ships, this.userShips);
      console.log(this.ships)
    this.shipsService.$shipsChanged.subscribe((response) => {
      this.ships = response.results;
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
    });
    this.shipsService.fetchUserShips()
  }

  onFetchLink(url) {
    this.shipsService.fetchLink(url);
  }

  onShowShipInfo(ship) {
    this.ship = ship;
    this.modalService.toggleModal();
  }

  onFetchImageLink(url) {
    return this.shipsService.fetchImageLink(url);
  }

  onIncludeCustomShips(shipsArray, customShips){
    this.shipsService.includeCustomShips(shipsArray,customShips)
  }
  // onFetchImageLink(url){
  //   this.shipsService.fetchImageLink(url)
  // }
}
