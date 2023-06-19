import {Component} from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // eslint-disable-next-line
  ProfilePicture: any;

  pbToUpload: File | undefined;
  public vorname = "";
  public nachname = "";
  public email = "";
  public emailbestaetigt = "";
  public password = "";
  public passwordbestaetigt = "";
  public geburtstag = new Date();

  SignUp(): void {
    const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (

      this.vorname.length !== 0 &&
      this.nachname.length !== 0 &&
      this.password.length > 7 &&
      this.email.match(mailformat) &&
      this.email === this.emailbestaetigt &&
      this.password === this.passwordbestaetigt &&
      this.checkUserAge(this.geburtstag.toString())
    ) {
      console.log('test1');
    } else {
      console.log('test2');
    }
  }

  handleFileInput(files: Event): void {
    this.pbToUpload = (files.target as HTMLInputElement).files?.[0];
    console.log(this.pbToUpload);
  }

  checkUserAge(dateString: string): boolean {
    const userDate: Date = new Date(dateString);
    const currentDate: Date = new Date();
    const minimumAge: number = 18 * 365 * 24 * 60 * 60 * 1000; // 18 years in milliseconds
    const ageDelta: number = currentDate.getTime() - userDate.getTime();

    return ageDelta >= minimumAge;
  }

}

