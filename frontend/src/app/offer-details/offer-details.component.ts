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

  public owner = false;
  public booked = false;
  public rideDone = false;
  public allowTracking = false;
  // this function will be called when the component is initialized
  ngOnInit() {
    const offerId: string | null = this.route.snapshot.paramMap.get('id');// get the id from the url
    this.owner = JSON.parse(this.route.snapshot.paramMap.get('owner') as string);
    this.booked = JSON.parse(this.route.snapshot.paramMap.get('booked') as string);
    this.rideDone = JSON.parse(this.route.snapshot.paramMap.get('rideDone') as string)
    this.allowTracking = JSON.parse(this.route.snapshot.paramMap.get('allowTracking') as string)
    if (offerId) {
      // TODO: get the offer from the backend/service
    }
  }

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
