import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { OfficersService } from '../../../services/officers.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { OfficerBrief } from '../../../models/officers/officer-brief';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css']
})
export class ProjectsAddComponent implements OnInit {

  private projectsService: ProjectsService = inject(ProjectsService);
  private officersService: OfficersService = inject(OfficersService);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  projectForm = this.fb.group({
    name: ['', [Validators.required]],
    executingSide: [null],
    benefitingSide: [null],
    estimatedCost: [null],
    financialAllocation: [null],
    estimatedStartDate: [null],
    estimatedEndDate: [null],
    actualStartDate: [null],
    actualEndDate: [null],
    address: [null],
    latitude: [null],
    longitude: [null],
    status: ['', [Validators.required]],
    executionPercent: [null],
    executionDate: [null],
    supervisorId: ['', [Validators.required]],
    notes: [null]
  });

  officers: OfficerBrief[] = [];
  isSubmitting: boolean = false;


  ngOnInit() {
    this.loadOfficers();
  }

  loadOfficers() {
    this.officersService.getAll()
      .pipe(first())
      .subscribe(response => this.officers = response.data);
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.projectsService.create(this.projectForm.value)
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة المشروع بنجاح!', 'success');
          this.router.navigate([`/projects`]);
        }
      });
  }
}
