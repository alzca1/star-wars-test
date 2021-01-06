import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalWasActivated: boolean; 
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.$modalChanged.subscribe(response => {
      this.modalWasActivated = response; 
    })
  }

  onToggleModal(){
    this.modalService.toggleModal(); 
  }

}
