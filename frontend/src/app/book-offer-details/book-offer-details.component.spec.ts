import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfferDetailsComponent } from './book-offer-details.component';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

describe('BookOfferDetailsComponent', () => {
  let component: BookOfferDetailsComponent;
  let fixture: ComponentFixture<BookOfferDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookOfferDetailsComponent],
      providers: [NgbActiveModal],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(BookOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
