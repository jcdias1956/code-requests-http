import { ComfirmModalComponent } from './confirm-modal/comfirm-modal.component';
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

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
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
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ComfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;
    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }
    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ComfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
