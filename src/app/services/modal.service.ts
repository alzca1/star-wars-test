import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalIsActive: boolean = false;
  $modalChanged = new BehaviorSubject(false);  

  constructor() { }


  toggleModal(){
    this.modalIsActive = !this.modalIsActive; 
    this.$modalChanged.next(this.modalIsActive); 
  }
}
