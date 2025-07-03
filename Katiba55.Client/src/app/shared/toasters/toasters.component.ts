import { JsonPipe, NgClass, NgStyle, SlicePipe } from '@angular/common';
import { Component, inject, OnInit, viewChildren } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';


import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TextColorDirective,
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToasterPlacement,
  ToastHeaderComponent
} from '@coreui/angular';
import { AppToastComponent } from './toast-simple/toast.component';

@Component({
  selector: 'app-toasters',
  templateUrl: './toasters.component.html',
  styleUrls: ['./toasters.component.scss'],
  imports: [RowComponent, ColComponent, ToasterComponent, NgClass, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ContainerComponent, ReactiveFormsModule, FormDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormSelectDirective, ButtonDirective, NgStyle, ToastComponent, ToastHeaderComponent, ToastBodyComponent, AppToastComponent, JsonPipe, SlicePipe, TextColorDirective]
})
export class ToastersComponent implements OnInit {

  private toasterService = inject(ToasterService);
  positions = Object.values(ToasterPlacement);

  readonly toasterComponents = viewChildren(ToasterComponent);

  ngOnInit(): void {
    this.toasterService.toast$.subscribe(toast => {
      if (toast) {
        this.addToast(toast.title, toast.message, toast.color);
      }
    });
  }

  addToast(title: string, message: string, color: string) {
    const containers = this.toasterComponents().filter(item => item.placement === ToasterPlacement.TopEnd);

    containers.forEach(container => {
      const props = {
        title: title,
        message: message,
        color: color,
        position: ToasterPlacement.TopEnd,
        autohide: true,
        delay: 5000,
        fade: true,
        closeButton: true
      };
      const componentRef = container.addToast(AppToastComponent, props, {});
    });
  }
}
