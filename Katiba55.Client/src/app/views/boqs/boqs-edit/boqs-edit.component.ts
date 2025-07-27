import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { BOQsService } from '../../../services/BOQs.service';

@Component({
  selector: 'app-boqs-edit',
  templateUrl: './boqs-edit.component.html',
  styleUrls: ['./boqs-edit.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SpinnerComponent
  ]
})
export class BoqsEditComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  boqForm = this.fb.group({
    title: ['', [Validators.required]],
    number: ['', [Validators.required]],
    value: [null, [Validators.required, Validators.min(0)]],
    status: ['', [Validators.required]]
  });

  boqId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.boqId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadBoq();
  }

  loadBoq() {
    this.boqsService.getById(this.boqId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const boq = response.data;
          this.boqForm.patchValue({
            ...boq as any
          });
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.boqsService.update(this.boqId, { ...this.boqForm.value })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل المقايسة بنجاح!', 'success');
          if (this.workId)
            this.router.navigate(['/works', this.workId], { fragment: 'boqs' });
          else
            this.router.navigate(['/boqs']);
        }
      });
  }
}