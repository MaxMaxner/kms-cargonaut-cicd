import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gesuche-erstellen',
  templateUrl: './gesuche-erstellen.component.html',
  styleUrls: ['./gesuche-erstellen.component.scss']
})
export class GesucheErstellenComponent {
  validateForm(form: NgForm): boolean {
    if (form.invalid) {
      const emptyInputs = Object.keys(form.controls)
        .filter(key => {
          const control = form.controls[key];
          const isCheckbox = control.value === false; // Check if it's a checkbox and not checked
          const isSonstigeInfos = key === 'sonstigeinfos' && control.value === '';

          return (control.value === '' || isCheckbox || isSonstigeInfos);
        });

      const errorMessage = 'Bitte füllen Sie alle Felder aus: ' + emptyInputs.join(', ');
      alert(errorMessage);

      return false;
    }

    return true;
  }
}
