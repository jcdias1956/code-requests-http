import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ComfirmModalComponent } from './confirm-modal/comfirm-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ComfirmModalComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent, ComfirmModalComponent]
})
export class SharedModule { }
