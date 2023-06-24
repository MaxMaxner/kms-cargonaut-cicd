import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  public comments = "";
  public check1 = false;
  public check2 = false;
  public check3 = false;
  public check4 = false;
  public rating = 0;
  constructor(public activeModal: NgbActiveModal) {
  }

  save() {
    if (this.comments.trim().length > 0) {
      this.activeModal.close({comments: this.comments, rating: this.rating});
    }
  }

  protected readonly console = console;
}
