import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  // fallback route
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // route to home component
  { path: 'home', component: HomeComponent },
  {path: "login", component: LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


