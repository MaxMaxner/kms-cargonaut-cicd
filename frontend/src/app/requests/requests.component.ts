import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent {


  public von  = "";
  public nach  = "";
  public datum  = "";
  public anzahl  =  "";
  public gewicht  = "";
  public ausmessung = "";



  filter(){
    //Hier die Funktion für das Filtern schreiben
  }
}
