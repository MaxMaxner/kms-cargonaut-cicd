import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angebot-erstellen1',
  templateUrl: './angebot-erstellen1.component.html',
  styleUrls: ['./angebot-erstellen1.component.scss']
})
export class AngebotErstellenEinsComponent {
  validateForm(form: NgForm): boolean {
    if (form.invalid) {
      const emptyInputs = Object.keys(form.controls)
        .filter(key => {
          const control = form.controls[key];
          const isCheckbox = control.value === false; // Check if it's a checkbox and not checked
          const isSonstigeInfos = key === 'sonstigeinfos' && control.value === '';
          const isZwischenziel = key === 'zwischenziel' && control.value === ''; // Consider "Zwischenziel" input as optional

          return (control.value === '' || isCheckbox || isSonstigeInfos || isZwischenziel);
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
