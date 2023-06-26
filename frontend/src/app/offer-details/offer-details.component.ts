import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {

  constructor(
    private route: ActivatedRoute,
  ) {  }

  // this function will be called when the component is initialized
  ngOnInit() {
    const offerId: string | null = this.route.snapshot.paramMap.get('id'); // get the id from the url
    if (offerId) {
      // TODO: get the offer from the backend/service
    }
  }


  public owner  = false;
  public booked = false;
  public rideDone= false;
  public allowTracking = true;

}
