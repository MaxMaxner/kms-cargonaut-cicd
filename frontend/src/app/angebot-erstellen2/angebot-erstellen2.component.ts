import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-angebot-erstellen2',
  templateUrl: './angebot-erstellen2.component.html',
  styleUrls: ['./angebot-erstellen2.component.scss']
})
export class AngebotErstellenZweiComponent {
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
        const errorMessage = 'Bitte füllen Sie alle Felder aus : ' + emptyInputs.join(', ');
        alert(errorMessage);
        return false;
      }
    }

    return true;
  }

}
