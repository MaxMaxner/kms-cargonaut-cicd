import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyoffersComponent } from './myoffers.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe('MyoffersComponent', () => {
  let component: MyoffersComponent;
  let fixture: ComponentFixture<MyoffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyoffersComponent],
      imports: [RouterModule],
      providers: [
        NgbActiveModal,
        {
          provide: ActivatedRoute,
          useValue: {
            // Add any properties or methods you need to mock here
          },
        },
      ],
    });
    fixture = TestBed.createComponent(MyoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
