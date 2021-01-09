import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  ships = [];
  $shipsChanged = new Subject();
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getShips() {
    let baseUrl = 'https://swapi.dev/api/starships/?page=1';
    return this.http.get(baseUrl);
  }

  UpdateShipsList(url) {
    this.http.get(url).subscribe((response) => {
      this.$shipsChanged.next(response);
    });
  }

  fetchLink(url) {
    const page = url.split('=')[1];
    const newUrl = `https://swapi.dev/api/starships/?page=${page}`;
    this.UpdateShipsList(newUrl);
  }

  fetchImageLink(url) {
    if (url.includes('swapi')) {
      const id = url
        .split('/')
        .filter((item) => {
          return item !== '';
        })
        .slice(-1)[0];

      let baseUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

      return baseUrl;
    }
    return url; 
  }

  fetchUserShips() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userEmail = this.authenticationService.getCurrentUser()[0];

    let userShips;

    for (let user of users) {
      if (user.email === userEmail) {
        userShips = user.ships;
      }
    }
    return userShips;
  }

  includeCustomShips(shipsArray, customShipsArray) {
    if (customShipsArray.length > 0) {
      customShipsArray.map((element) => {
        shipsArray.push(element);
      });
      console.log(shipsArray);
      return true;
    }
    return false;
  }
}
