import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-book-offer-details',
  templateUrl: './book-offer-details.component.html',
  styleUrls: ['./book-offer-details.component.scss']
})
export class BookOfferDetailsComponent {
  public persons = "";
  public size = "";
  public weight = ""

  constructor(public activeModal: NgbActiveModal) {
  }

  save() {
    if (this.persons.trim().length !== 0 || this.size.trim().length !== 0 && this.weight.trim().length !== 0) {
      this.activeModal.close({persons: this.persons, size: this.size, weight: this.weight});
    }
  }
}
