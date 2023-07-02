import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { KasseComponent } from './kasse.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe('KasseComponent', () => {
  let component: KasseComponent;
  let fixture: ComponentFixture<KasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasseComponent],
      imports: [FormsModule,ReactiveFormsModule, RouterModule],
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
    fixture = TestBed.createComponent(KasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
