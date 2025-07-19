import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../../../shared/forms/text-input/text-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../../../../models/items/item';
import { ItemsService } from '../../../../../services/items.service';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../../../services/toaster.service';

@Component({
  selector: 'app-update-items-modal',
  templateUrl: './update-items-modal.component.html',
  styleUrls: ['./update-items-modal.component.css'],
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
export class UpdateItemsModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() projectId: number = 0;
  @Input() item: Item | null = null;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemUpdated: EventEmitter<Item> = new EventEmitter<Item>();

  private itemsService: ItemsService = inject(ItemsService);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  itemForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  isSubmitting: boolean = false;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      this.itemForm.patchValue({
        name: this.item.name
      });
    }
  }

  onSubmit() {
    this.isSubmitting = true;
    this.itemsService.update(this.item!.id, { ... this.itemForm.value, projectId: this.projectId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل البند بنجاح!', 'success');
          this.item!.name = this.itemForm.value.name!;
          this.itemUpdated.emit(this.item!);
          this.close();
        }
      });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.itemForm.reset();
    if (this.item) {
      this.itemForm.patchValue({
        name: this.item.name
      });
    }
  }
}
