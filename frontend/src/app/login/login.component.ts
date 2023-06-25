import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {SessionServiceService} from "../services/session-service.service";

import {error} from "@angular/compiler-cli/src/transformers/util";
import {AlertService} from "../services/alert-service.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: any;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  message: string = "";
  stayLoggedIn = false;
  public environment = {
    apiUrl: 'http://localhost:8080'
  };

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private sessionService: SessionServiceService, private http: HttpClient, private alert: AlertService) {
    // redirect to home if already logged in
    if (this.sessionService.userValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
this.sessionService.checkLogin();

    //Formvalidator
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {

    // reset alerts on submit
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log(this.loginForm.invalid);

      this.message = "Bitte Felder füllen.";
      return
    }
    this.login(this.f.email.value, this.f.password.value);
    console.log(this.f.email.value)
    this.loading = true;
  }

   login(email: string, password: string) {
     this.sessionService.login(this.f.email.valuetrim(), this.f.password.value);
  }
}
