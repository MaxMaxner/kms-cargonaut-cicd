import { Component } from '@angular/core';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {

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
