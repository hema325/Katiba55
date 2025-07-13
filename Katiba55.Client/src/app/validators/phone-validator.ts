import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (!value)
            return null;

        return /^\+?\d{10,15}$/.test(value) ? null : { phone: true };
    }
}