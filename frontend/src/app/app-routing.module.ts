import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { start } from '@popperjs/core';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OffersComponent } from './offers/offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ExperienceComponent } from './experience/experience.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RequestsComponent } from './requests/requests.component';
import { MyrequestsComponent } from './myrequests/myrequests.component';
import { MyoffersComponent } from './myoffers/myoffers.component';
import { AngebotErstellenEinsComponent } from './angebot-erstellen1/angebot-erstellen1.component';
import { AngebotErstellenZweiComponent } from './angebot-erstellen2/angebot-erstellen2.component';
import { GesucheErstellenComponent } from './gesuche-erstellen/gesuche-erstellen.component';
import { KasseComponent } from './kasse/kasse.component';
import { TrackingComponent } from './tracking/tracking.component';

const routes: Routes = [
    {
        path: 'start',
        component: StartComponent,
    },
    // fallback route
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    // route to home component
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'offers', component: OffersComponent },
    {
        path: 'offer-details/:id/:owner/:booked/:rideDone/:allowTracking',
        component: OfferDetailsComponent,
    },
    { path: 'experience/:id', component: ExperienceComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'myoffers', component: MyoffersComponent },
    { path: 'requests', component: RequestsComponent },
    { path: 'myrequests', component: MyrequestsComponent },
    { path: 'offerOne', component: AngebotErstellenEinsComponent },
    { path: 'offerTwo', component: AngebotErstellenZweiComponent },
    { path: 'search', component: GesucheErstellenComponent },
    { path: 'checkout', component: KasseComponent },
    { path: 'tracking', component: TrackingComponent },
    { path: 'vehicle', component: VehicleComponent },
    { path: 'createrequest', component: GesucheErstellenComponent },
    { path: 'createoffer1', component: AngebotErstellenEinsComponent },
    { path: 'createoffer2', component: AngebotErstellenZweiComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
