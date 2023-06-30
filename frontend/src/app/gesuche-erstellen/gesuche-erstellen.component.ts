import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gesuche-erstellen',
  templateUrl: './gesuche-erstellen.component.html',
  styleUrls: ['./gesuche-erstellen.component.scss']
})
export class GesucheErstellenComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      datum: ['', Validators.required],
      time: [''],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      anzahlPersonen: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      fracht: ['', Validators.required],
      musik: [false],
      unterhaltung: [false],
      mitfahrer: [false],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      von: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      nach: ['', Validators.required],
      anmerkungen: [''],
      keineTiere: [false],
      nichtraucher: [false],
    });
  }

  validateForm(): boolean {
    const form = this.myForm;
    if (form.invalid) {
      const emptyInputs = Object.keys(form.controls)
        .filter(key => {
          const control = form.controls[key];
          const isCheckbox = control.value === false;
          const isAnmerkungen = key === 'anmerkungen' && control.value === '';

          return control.value === '' || isCheckbox || isAnmerkungen;
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
