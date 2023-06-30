import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-angebot-erstellen1',
  templateUrl: './angebot-erstellen1.component.html',
  styleUrls: ['./angebot-erstellen1.component.scss']
})
export class AngebotErstellenEinsComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      datum: ['', Validators.required],
      time: [''],
      anmerkungen: [''],
      musik: [false],
      unterhaltung: [false],
      mitfahrer: [false],
      sonstigeinfo: ['', Validators.required],
      von: ['', Validators.required],
      nach: ['', Validators.required],
      zwischenziel: [''],
      handynummer: ['', Validators.required],
      keineTiere: [false],
      nichtraucher: [false]
    });
  }

  validateForm(): void {
    if (this.myForm.invalid) {
      const emptyInputs = Object.keys(this.myForm.controls).filter((key: string) => {
        const control = this.myForm.get(key);
        const isCheckbox = control?.value === false;
        const isSonstigeInfos = key === 'sonstigeinfo' && control?.value === '';
        const isZwischenziel = key === 'zwischenziel' && control?.value === '';

        return control?.value === '' || isCheckbox || isSonstigeInfos || isZwischenziel;
      });

      if (emptyInputs.length > 0) {
        const errorMessage = 'Bitte füllen Sie alle Felder aus: ' + emptyInputs.join(', ');
        alert(errorMessage);
        return;
      }
    }

    const formData: FormData = new FormData();
    formData.append('datum', this.myForm.get('datum')?.value);
    formData.append('time', this.myForm.get('time')?.value);
    formData.append('anmerkungen', this.myForm.get('anmerkungen')?.value);
    formData.append('musik', this.myForm.get('musik')?.value);
    formData.append('unterhaltung', this.myForm.get('unterhaltung')?.value);
    formData.append('mitfahrer', this.myForm.get('mitfahrer')?.value);
    formData.append('sonstigeinfo', this.myForm.get('sonstigeinfo')?.value);
    formData.append('von', this.myForm.get('von')?.value);
    formData.append('nach', this.myForm.get('nach')?.value);
    formData.append('zwischenziel', this.myForm.get('zwischenziel')?.value);
    formData.append('handynummer', this.myForm.get('handynummer')?.value);
    formData.append('keineTiere', this.myForm.get('keineTiere')?.value);
    formData.append('nichtraucher', this.myForm.get('nichtraucher')?.value);

    this.httpClient.post('offerOne', formData).subscribe(
      (response) => {
        // Handle successful response
        console.log(response);
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }
}
