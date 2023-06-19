import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  public email= "";
  public password= "";



  Login() {
    console.log(this.email)
    console.log(this.password)
    const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if( this.password.length > 7 &&
      this.email.match(mailformat)
    ) {
      console.log("läuft");
    } else {
      console.log("läuft nicht");
    }
  }
}
