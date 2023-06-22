import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {

  public owner  = false;
  public booked = false;
  public rideDone= false;
  public allowTracking = true;

}
