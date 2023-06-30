import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'frontend'
    userIsLoggedIn: boolean

    constructor() // private authService: AuthService  <== handle auth logic here to determine if user is logged in
    {
        this.userIsLoggedIn = true // <== this.userIsLoggedIn = this.authService.isLoggedIn(); or something like that
    }
}
