import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngebotErstellenEinsComponent } from './angebot-erstellen1.component';

describe('AngebotErstellenEinsComponent', () => {
  let component: AngebotErstellenEinsComponent;
  let fixture: ComponentFixture<AngebotErstellenEinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngebotErstellenEinsComponent]
    });
    fixture = TestBed.createComponent(AngebotErstellenEinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
