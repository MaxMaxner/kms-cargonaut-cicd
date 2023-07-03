import {Component} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert-service.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public mail = "";
  public firstname = "";
  public lastname = "";
  public password = "";
  public birthday = new Date().toString();
  public mobilephone = "";
  // eslint-disable-next-line
  ProfilePicture: any;
  photo = "";
  licence = false;
  smocker = false;
  language = [];
  public emailbestaetigt = "";
  public passwordbestaetigt = "";


  constructor(private UserService: UserService,  private alert: AlertService) {
  }

  async SignUp() {
    console.log(this.licence)
    console.log(this.smocker)
    const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.firstname.length !== 0 &&
      this.lastname.length !== 0 &&
      this.password.length > 0 &&
      this.mail.match(mailformat) &&
      this.mail === this.emailbestaetigt &&
      this.password === this.passwordbestaetigt &&
      this.checkUserAge(this.birthday.toString())
    ) {
      const user: User = new User(
        this.mail,
        this.firstname,
        this.lastname,
        this.password,
        this.birthday,
        this.mobilephone,
        this.photo,
        this.licence,
        this.smocker,
        this.language
      );
      console.log(user)
       await this.UserService.register(user);
    } else {
      this.alert.show("Fehler","Es wurden nicht alle Fehler ausgefüllt. Du musst mindestens 18 Jahre alt sein!");
    }
  }

  handleFileInput(files: Event): void {
   // this.photo = (files.target as HTMLInputElement).files?.[0];
    console.log(this.photo);
  }

  checkUserAge(dateString: string): boolean {
    const userDate: Date = new Date(dateString);
    const currentDate: Date = new Date();
    const minimumAge: number = 18 * 365 * 24 * 60 * 60 * 1000; // 18 years in milliseconds
    const ageDelta: number = currentDate.getTime() - userDate.getTime();
    return ageDelta >= minimumAge;
  }


}
