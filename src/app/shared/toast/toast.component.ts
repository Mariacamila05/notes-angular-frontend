import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

export interface handleToast {
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnChanges {
  @Input({ required: true }) toast: handleToast = {
    message: '',
    type: 'success',
  }
  showToast: boolean = false;

  constructor() {

  }

  ngOnChanges(): void {
    if (this.toast.message !== '') {
      this.showToast = true;
    }
  }

  closeToast(): void {
    this.toast = {
      message: '',
      type: 'success',
    };

    this.showToast = false;
  }
}
