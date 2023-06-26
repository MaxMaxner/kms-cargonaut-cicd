import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-kasse',
  templateUrl: './kasse.component.html',
  styleUrls: ['./kasse.component.scss']
})
export class KasseComponent {
  validateForm(form: NgForm): boolean {
    if (form.invalid) {
      const emptyInputs = Object.keys(form.controls)
        .filter(key => {
          const control = form.controls[key];
          const isCheckbox = control.value === false; // Check if it's a checkbox and not checked
          const isSonstigeInfos = key === 'sonstigeinfos' && control.value === '';

          return (control.value === '' || isCheckbox || isSonstigeInfos);
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
