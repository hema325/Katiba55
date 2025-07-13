import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  constructor(@Self() private controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  get control() {
    return this.controlDir.control as FormControl;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }


}
