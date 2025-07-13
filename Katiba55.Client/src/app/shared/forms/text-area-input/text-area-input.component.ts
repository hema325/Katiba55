import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class TextAreaInputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() rows: number = 4;

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
