import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    // const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    // bsModalRef.content.type = 'danger';
    // bsModalRef.content.message = message;
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    // const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    // bsModalRef.content.type = 'success';
    // bsModalRef.content.message = message;
    this.showAlert(message, AlertTypes.SUCCESS);
  }
}
