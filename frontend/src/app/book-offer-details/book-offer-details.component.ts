import { Component } from '@angular/core';

@Component({
  selector: 'app-book-offer-details',
  templateUrl: './book-offer-details.component.html',
  styleUrls: ['./book-offer-details.component.scss']
})
export class BookOfferDetailsComponent {
  public title: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  save() {
    if (this.title.trim().length > 0) {
      this.activeModal.close(this.title);
    }
  }
}
