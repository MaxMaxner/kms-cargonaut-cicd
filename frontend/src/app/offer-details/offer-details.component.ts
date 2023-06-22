import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {

  public owner  = true;
  public booked = true;
  public rideDone= true;
  public allowTracking = true;

}
