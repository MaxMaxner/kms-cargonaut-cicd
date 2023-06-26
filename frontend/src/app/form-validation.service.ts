import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  validateForm(form: NgForm, optionalFields: string[] = []): boolean {
    if (form.invalid) {
      const emptyInputs = Object.keys(form.controls)
        .filter(key => {
          const control = form.controls[key];
          const isCheckbox = control.value === false; // Check if it's a checkbox and not checked
          const isOptionalField = optionalFields.includes(key) && control.value === '';

          return (control.value === '' || isCheckbox || isOptionalField);
        });

      if (emptyInputs.length > 0) {
        const errorMessage = 'Bitte füllen Sie alle Felder aus: ' + emptyInputs.join(', ');
        alert(errorMessage);
        return false;
      }
    }

    return true;
  }
}
