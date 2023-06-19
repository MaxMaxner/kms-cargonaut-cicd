import { Component } from '@angular/core';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {


  von  = "";
  nach  = "";
  datum  = "";
  anzahl  =  "";
  gewicht  = "";
  ausmessung = "";


  filter(){
    //Hier die Funktion für das Filtern schreiben
  }


}
