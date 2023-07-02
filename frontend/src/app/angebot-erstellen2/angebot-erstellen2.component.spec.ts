import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { AngebotErstellenZweiComponent } from './angebot-erstellen2.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe('AngebotErstellenZweiComponent', () => {
  let component: AngebotErstellenZweiComponent;
  let fixture: ComponentFixture<AngebotErstellenZweiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngebotErstellenZweiComponent],
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
    fixture = TestBed.createComponent(AngebotErstellenZweiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
