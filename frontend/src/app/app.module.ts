import { NgIconsModule } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './navbar/navbar.component'
import { NavbarLogedInComponent } from './navbar-loged-in/navbar-loged-in.component'
import { RegisterComponent } from './register/register.component'
import { OffersComponent } from './offers/offers.component'
import { ExperienceComponent } from './experience/experience.component'
import { OfferDetailsComponent } from './offer-details/offer-details.component'
import { ProfileComponent } from './profile/profile.component'
import { MatSelectModule } from '@angular/material/select'
import { VehicleComponent } from './vehicle/vehicle.component'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule} from '@angular/forms'
import { SessionServiceService } from './services/session-service.service'
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion'
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel'
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { MdbModalModule } from 'mdb-angular-ui-kit/modal'
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover'
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio'
import { MdbRangeModule } from 'mdb-angular-ui-kit/range'
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple'
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy'
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs'
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip'
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AlertComponent } from './alert/alert.component'
import { StartComponent } from './start/start.component'
import { AlertService } from './services/alert-service.service';
import { MyrequestsComponent } from './myrequests/myrequests.component';
import { RequestsComponent } from './requests/requests.component';
import { MyoffersComponent } from './myoffers/myoffers.component';
import { AngebotErstellenZweiComponent} from "./angebot-erstellen2/angebot-erstellen2.component";
import {AngebotErstellenEinsComponent} from "./angebot-erstellen1/angebot-erstellen1.component";
import {GesucheErstellenComponent} from "./gesuche-erstellen/gesuche-erstellen.component";
import {TrackingComponent} from "./tracking/tracking.component";
import {KasseComponent} from "./kasse/kasse.component";
import { BookOfferDetailsComponent } from './book-offer-details/book-offer-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsComponent } from './reviews/reviews.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'start', component: StartComponent },
]

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
        ProfileComponent,
        VehicleComponent,
        LoginComponent,
        AlertComponent,
        StartComponent,
        MyrequestsComponent,
        RequestsComponent,
        MyoffersComponent,
        AngebotErstellenEinsComponent,
        AngebotErstellenZweiComponent,
        GesucheErstellenComponent,
        KasseComponent,
        TrackingComponent,
      BookOfferDetailsComponent,
      ReviewsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgIconsModule.withIcons({ heroUsers }),
        FormsModule,
        RouterModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
        ReactiveFormsModule,
        MdbAccordionModule,
        MdbCarouselModule,
        MdbCheckboxModule,
        MdbCollapseModule,
        MdbDropdownModule,
        MdbFormsModule,
        MdbModalModule,
        MdbPopoverModule,
        MdbRadioModule,
        MdbRangeModule,
        MdbRippleModule,
        MdbScrollspyModule,
        MdbTabsModule,
        MdbTooltipModule,
        MdbValidationModule,
        BrowserAnimationsModule,
        NgbModule,
    ],
    providers: [SessionServiceService, AlertService],
    bootstrap: [AppComponent],
})
export class AppModule {}
