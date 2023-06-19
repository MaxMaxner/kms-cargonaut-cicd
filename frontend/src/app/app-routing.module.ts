import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from './profile/profile.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
    // fallback route
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    // route to home component
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
