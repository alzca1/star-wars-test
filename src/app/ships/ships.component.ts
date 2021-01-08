import { Component, Input, OnInit } from '@angular/core';
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
  nextUrl: string;
  previousUrl: string;
  constructor(private shipsService: ShipsService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.shipsService.getShips();
    this.shipsService.$shipsChanged.subscribe((response: any) => {
      this.ships = response.results;
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
      console.log(this.nextUrl, this.previousUrl)
    });
  }

  onFetchLink(url) {
    this.shipsService.fetchLink(url);
  }

  onShowShipInfo(ship){
    this.ship = ship; 
    this.modalService.toggleModal();
  }

  onFetchImageLink(url) {
    return this.shipsService.fetchImageLink(url)
  }

  // onFetchImageLink(url){
  //   this.shipsService.fetchImageLink(url)
  // }
}
