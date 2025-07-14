import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class FileInputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() accept: string = '*/*';
  @Input() multiple: boolean = false;
  touched: boolean = false;

  constructor(@Self() private controlDir: NgControl) {
    controlDir.valueAccessor = this;
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

  onFileChange(event: any): void {
    if (event.target && event.target.files.length > 0) {
      if (this.multiple) {
        const files = event.target.files;
        this.control.setValue(Array.from(files));
      }
      else {
        const file = event.target.files[0];
        this.control.setValue(file);
      }
    }
  }

}
