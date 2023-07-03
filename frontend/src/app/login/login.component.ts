import { Component } from '@angular/core';
import { SessionServiceService } from '../services/session-service.service';
import {AlertService} from "../services/alert-service.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public mail = '';
    public password = '';

    constructor(private SessionService: SessionServiceService, private alert: AlertService) {}

    Login() {

        const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        if (this.password.length > 0 && this.mail.match(mailformat)) {
            this.SessionService.login(this.mail, this.password);
        } else {
          this.alert.show('Fehler', 'Es wurden nicht alle Felder ausgefüllt');

        }
    }
}
