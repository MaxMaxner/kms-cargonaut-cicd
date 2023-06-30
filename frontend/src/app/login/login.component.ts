import { Component } from '@angular/core'
import { SessionServiceService} from "../services/session-service.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public mail = ''
    public password = ''

  constructor(private SessionService: SessionServiceService) {
  }

    Login() {
        console.log(this.mail)
        console.log(this.password)
        const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
        if (this.password.length > 0 && this.mail.match(mailformat)) {
            console.log('läuft')
          this.SessionService.login(this.mail, this.password)
        } else {
            console.log('läuft nicht')
        }
    }
}
