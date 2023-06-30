import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';

import { AngebotErstellenEinsComponent } from './angebot-erstellen1.component';

describe('AngebotErstellenEinsComponent', () => {
  let component: AngebotErstellenEinsComponent;
  let fixture: ComponentFixture<AngebotErstellenEinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngebotErstellenEinsComponent],
      imports: [FormsModule,ReactiveFormsModule] // Add the FormsModule here
    });
    fixture = TestBed.createComponent(AngebotErstellenEinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
