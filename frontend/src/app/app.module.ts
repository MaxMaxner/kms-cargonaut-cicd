import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GesucheErstellenComponent } from './gesuche-erstellen/gesuche-erstellen.component';
import { AngebotErstellen1Component } from './angebot-erstellen1/angebot-erstellen1.component';
import { AngebotErstellen2Component } from './angebot-erstellen2/angebot-erstellen2.component';

@NgModule({
  declarations: [
    AppComponent,
    GesucheErstellenComponent,
    AngebotErstellen1Component,
    AngebotErstellen2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
