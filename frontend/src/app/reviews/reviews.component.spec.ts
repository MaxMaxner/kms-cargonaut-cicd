import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewsComponent} from './reviews.component';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OfferDetailsComponent} from "../offer-details/offer-details.component";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReviewsComponent,
        OfferDetailsComponent,
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        NgbActiveModal,
        OfferDetailsComponent,
        NgbActiveModal,
        {
          provide: ActivatedRoute,
          useValue: {
            // Add any properties or methods you need to mock here
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
