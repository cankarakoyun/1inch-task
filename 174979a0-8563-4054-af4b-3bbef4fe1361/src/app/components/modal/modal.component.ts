import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() transactionHash: string
  @Input() type: string
  @Output() clearModal = new EventEmitter<boolean>()

  close() {
    this.clearModal.next(true);
  }
}
