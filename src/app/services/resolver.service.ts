import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ShipsService } from './ships.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private shipsService: ShipsService) { }

  resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    return this.shipsService.getShips(); 
  }
}
