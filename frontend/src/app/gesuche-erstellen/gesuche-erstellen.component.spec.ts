import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { GesucheErstellenComponent } from './gesuche-erstellen.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe('GesucheErstellenComponent', () => {
  let component: GesucheErstellenComponent;
  let fixture: ComponentFixture<GesucheErstellenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GesucheErstellenComponent],
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
    fixture = TestBed.createComponent(GesucheErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
