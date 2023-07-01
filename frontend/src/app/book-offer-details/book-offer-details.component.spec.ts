import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfferDetailsComponent } from './book-offer-details.component';

describe('BookOfferDetailsComponent', () => {
  let component: BookOfferDetailsComponent;
  let fixture: ComponentFixture<BookOfferDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookOfferDetailsComponent]
    });
    fixture = TestBed.createComponent(BookOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
