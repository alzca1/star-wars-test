import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
})
export class ShipComponent implements OnInit {
 
  constructor() {}

  ship = 
  {
    image: 'https://starwars-visualguide.com/assets/img/starships/10.jpg',
    name: "Executor",
    model: "Executor-class star dreadnought",
    manufacturer: "Kuat Drive Yards, Fondor Shipyards",
    cost_in_credits: "1143350000",
    length: "19000",
    max_atmosphering_speed: "n/a",
    crew: "279144",
    passengers: "38000",
    cargo_capacity: "250000000",
    consumables: "6 years",
    hyperdrive_rating: "2.0",
    MGLT: "40",
    starship_class: "Star dreadnought",
    pilots: [],
    films: [
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/"
    ],
    created: "2014-12-15T12:31:42.547000Z",
    edited: "2017-04-19T10:56:06.685592Z",
    url: "https://swapi.dev/api/starships/15/"
  }

  ngOnInit(): void {}
}



