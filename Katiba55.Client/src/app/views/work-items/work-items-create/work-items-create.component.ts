import { Component, inject, OnInit } from '@angular/core';
import { WorkItemsService } from '../../../services/work-items.service';
import { ItemsService } from '../../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../../models/items/item';
import { finalize, first } from 'rxjs';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';

@Component({
  selector: 'app-work-items-create',
  templateUrl: './work-items-create.component.html',
  styleUrls: ['./work-items-create.component.css'],
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
export class WorkItemsCreateComponent implements OnInit {

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
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getByWorkId(this.workId).subscribe(response => {
      this.items = response.data;
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.workItemsService.create({ ...this.workItemForm.value, workId: this.workId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة العمل بنجاح!', 'success');
          this.router.navigate([`/works/${this.workId}`], { fragment: 'items' });
        }
      });
  }
}
