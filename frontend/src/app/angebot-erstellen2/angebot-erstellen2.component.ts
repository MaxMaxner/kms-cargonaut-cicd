import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-angebot-erstellen2',
  templateUrl: './angebot-erstellen2.component.html',
  styleUrls: ['./angebot-erstellen2.component.scss']
})
export class AngebotErstellenZweiComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      verfügbarePlätze: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      verfügbaresMass: ['', Validators.required],
      verfügbaresGewicht: [''],
      Anhanger: ['car'],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      AnhangerGrosse: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      PreisProPerson: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      PreisProPracht: ['', Validators.required],
      priceNegotiable: [false],
      sonstigeInfos: ['']
    });
  }


  validateForm(): boolean {
    if (this.myForm.invalid) {
      const emptyInputs = Object.keys(this.myForm.controls)
        .filter(key => {
          const control = this.myForm.controls[key];
          const isCheckbox = control.value === false;
          const isSonstigeInfos = key === 'sonstigeinfos' && control.value === '';
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
