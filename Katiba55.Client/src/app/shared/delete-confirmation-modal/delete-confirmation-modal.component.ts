import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective } from '@coreui/angular';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ButtonDirective,
  ]
})
export class DeleteConfirmationModalComponent {

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  setConfirmation(result: boolean) {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.confirmation.emit(result);
  }
}
