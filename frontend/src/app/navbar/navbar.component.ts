import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userIsLoggedIn: boolean

  constructor() // private authService: AuthService  <== handle auth logic here to determine if user is logged in
  {
    this.userIsLoggedIn = true // <== this.userIsLoggedIn = this.authService.isLoggedIn(); or something like that
  }

}
