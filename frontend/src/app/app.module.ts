import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ heroUsers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

