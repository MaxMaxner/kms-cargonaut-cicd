import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GesucheErstellenComponent } from './gesuche-erstellen/gesuche-erstellen.component';
import { AngebotErstellenEinsComponent } from './angebot-erstellen1/angebot-erstellen1.component';
import { AngebotErstellenZweiComponent } from './angebot-erstellen2/angebot-erstellen2.component';

@NgModule({
  declarations: [
    AppComponent,
    GesucheErstellenComponent,
    AngebotErstellenEinsComponent,
    AngebotErstellenZweiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
