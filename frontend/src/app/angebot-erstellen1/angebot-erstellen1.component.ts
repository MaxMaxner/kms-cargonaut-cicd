import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-angebot-erstellen1',
  templateUrl: './angebot-erstellen1.component.html',
  styleUrls: ['./angebot-erstellen1.component.scss']
})
export class AngebotErstellenEinsComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      datum: ['', Validators.required],
      time: [''],
      anmerkungen: [''],
      musik: [false],
      unterhaltung: [false],
      mitfahrer: [false],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      sonstigeinfo: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      von: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      nach: ['', Validators.required],
      zwischenziel: [''],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      handynummer: ['', Validators.required],
      keineTiere: [false],
      nichtraucher: [false]
    });
  }

  validateForm(): boolean {
    if (this.myForm.invalid) {
      const emptyInputs = Object.keys(this.myForm.controls)
        .filter(key => {
          const control = this.myForm.controls[key];
          const isCheckbox = control.value === false;
          const isSonstigeInfos = key === 'sonstigeinfo' && control.value === '';
          const isZwischenziel = key === 'zwischenziel' && control.value === '';

          return control.value === '' || isCheckbox || isSonstigeInfos || isZwischenziel;
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
