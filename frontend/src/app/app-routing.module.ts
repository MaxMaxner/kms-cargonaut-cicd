import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { start } from '@popperjs/core'
import { StartComponent } from './start/start.component'
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { OffersComponent } from './offers/offers.component'
import { OfferDetailsComponent } from './offer-details/offer-details.component'
import { ExperienceComponent } from './experience/experience.component'
import { VehicleComponent } from './vehicle/vehicle.component'

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
    { path: 'offer-details/:id', component: OfferDetailsComponent },
    { path: 'experience/:id', component: ExperienceComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'vehicle', component: VehicleComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
