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

  getShips(url?: string) {
    let baseUrl = 'https://swapi.dev/api/starships/?page=1';
    if (url) {
      baseUrl = url;
    }
    let blockPage = baseUrl.split('=')[1];
    return this.http.get(baseUrl).subscribe(
      (response) => {
        this.ships.push({ ...response, page: blockPage });
        this.$shipsChanged.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchLink(url) {
    const page = url.split('=')[1];
    for (let block of this.ships) {
      if (block.page === page) {
        return this.$shipsChanged.next(block);
      }
    }
    this.getShips(url);
  }

  fetchImageLink(url){
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
