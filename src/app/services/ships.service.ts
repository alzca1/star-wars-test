import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  ships = [];
  $shipsChanged = new Subject();
  constructor(private http: HttpClient) {}

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
