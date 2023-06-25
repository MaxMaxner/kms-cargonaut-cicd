import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {start} from "@popperjs/core";
import {StartComponent} from "./start/start.component";


const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'start',
    component: StartComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


