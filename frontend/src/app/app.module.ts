import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLogedInComponent } from './navbar-loged-in/navbar-loged-in.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { OffersComponent } from './offers/offers.component';
import { ExperienceComponent } from "./experience/experience.component";
import { RouterModule } from "@angular/router";
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { BookOfferDetailsComponent } from './book-offer-details/book-offer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavbarLogedInComponent,
    LoginComponent,
    RegisterComponent,
    OffersComponent,
    OfferDetailsComponent,
    ExperienceComponent,
    BookOfferDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ heroUsers }),
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

