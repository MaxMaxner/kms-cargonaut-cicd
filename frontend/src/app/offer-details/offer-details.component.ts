import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BookOfferDetailsComponent} from "../book-offer-details/book-offer-details.component";
import {ReviewsComponent} from "../reviews/reviews.component";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {  }

  // this function will be called when the component is initialized
  ngOnInit() {
    const offerId: string | null = this.route.snapshot.paramMap.get('id'); // get the id from the url
    if (offerId) {
      // TODO: get the offer from the backend/service
    }
  }


  public owner  = false;
  public booked = true;
  public rideDone= true;
  public allowTracking = true;

  async book() {
    try {
      await this.modalService.open(BookOfferDetailsComponent).result
    } catch (err) {
      console.log(err)
    }
  }

  async review() {
    try {
      await this.modalService.open(ReviewsComponent).result
    } catch (err) {
      console.log(err)
    }
  }

}
