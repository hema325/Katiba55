import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, SpinnerComponent } from '@coreui/angular';
import { ItemsService } from '../../../../../services/items.service';
import { ToasterService } from '../../../../../services/toaster.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, first } from 'rxjs';
import { TextInputComponent } from '../../../../../shared/forms/text-input/text-input.component';
import { Item } from '../../../../../models/items/item';

@Component({
  selector: 'app-create-items-modal',
  templateUrl: './create-items-modal.component.html',
  styleUrls: ['./create-items-modal.component.css'],
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ButtonDirective,
    TextInputComponent,
    SpinnerComponent,
    ReactiveFormsModule
  ]
})
export class CreateItemsModalComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() projectId: number = 0;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemCreated: EventEmitter<Item> = new EventEmitter<Item>();

  private itemsService: ItemsService = inject(ItemsService);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  itemForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  isSubmitting: boolean = false;

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmitting = true;
    this.itemsService.create({ ... this.itemForm.value, projectId: this.projectId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة البند بنجاح!', 'success');
          this.itemCreated.emit({
            id: response.data,
            name: this.itemForm.value.name!
          });
          this.close();
        }
      });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.itemForm.reset();
  }
}
