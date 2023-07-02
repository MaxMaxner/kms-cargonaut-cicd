import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-book-offer-details',
  templateUrl: './book-offer-details.component.html',
  styleUrls: ['./book-offer-details.component.scss']
})
export class BookOfferDetailsComponent {
  public persons = "";
  public size = "";
  public weight = ""

  constructor(public activeModal: NgbActiveModal, public router: Router) {
  }

  save() {
    if (this.persons.trim().length !== 0 || this.size.trim().length !== 0 && this.weight.trim().length !== 0) {
      this.activeModal.close({persons: this.persons, size: this.size, weight: this.weight});
      this.router.navigate(['checkout']);
    }
  }
}
