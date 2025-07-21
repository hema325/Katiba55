import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { Item } from 'src/app/models/items/item';
import { ItemsService } from 'src/app/services/items.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { WorkItemsService } from 'src/app/services/work-items.service';
import { SelectInputComponent } from 'src/app/shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from 'src/app/shared/forms/text-area-input/text-area-input.component';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';

@Component({
  selector: 'app-work-items-edit',
  templateUrl: './work-items-edit.component.html',
  styleUrls: ['./work-items-edit.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    TextInputComponent,
    TextAreaInputComponent,
    SelectInputComponent,
    SpinnerComponent
  ]
})
export class WorkItemsEditComponent implements OnInit {

  private workItemsService: WorkItemsService = inject(WorkItemsService);
  private itemsService: ItemsService = inject(ItemsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  workItemForm = this.fb.group({
    itemId: ['', [Validators.required]],
    executionStatus: ['', [Validators.required]],
    executedValue: ['', [Validators.required, Validators.min(0)]],
    totalValue: ['', [Validators.required, Validators.min(1)]],
  });

  items: Item[] = [];
  workItemId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.workItemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadItems();
    this.loadWorkItem();
  }

  loadWorkItem() {
    this.workItemsService.getById(this.workItemId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          this.workItemForm.patchValue({ ...response.data as any });
        }
      });
  }

  loadItems() {
    this.itemsService.getByWorkId(this.workId).subscribe(response => {
      this.items = response.data;
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.workItemsService.update(this.workItemId, { ...this.workItemForm.value, workId: this.workId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل العمل بنجاح!', 'success');
          this.router.navigate([`/works/${this.workId}`], { fragment: 'items' });
        }
      });
  }
}
