import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { OffersComponent } from "./offers/offers.component";
import { OfferDetailsComponent } from "./offer-details/offer-details.component";
import { ExperienceComponent } from "./experience/experience.component";

const routes: Routes = [
  // fallback route
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // route to home component
  { path: 'home', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "offers", component: OffersComponent },
  { path: "offer-details/:id", component: OfferDetailsComponent },
  { path: "experience/:id", component: ExperienceComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


