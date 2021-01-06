import { Component, Input, OnInit } from '@angular/core';
import { ShipsService } from '../services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  ships = [];
  nextUrl: string;
  previousUrl: string;
  constructor(private shipsService: ShipsService) {}

  ngOnInit(): void {
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

  getShipId(url) {
    const id = url
      .split('/')
      .filter((item) => {
        return item !== '';
      })
      .slice(-1)[0];

    let baseUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

    return baseUrl;
  }
}
