import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class SelectInputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

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

  onChange() {
    this.valueChanged.emit(this.control.value);
  }
}
