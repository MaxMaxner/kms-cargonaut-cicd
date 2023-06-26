import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngebotErstellenZweiComponent } from './angebot-erstellen2.component';

describe('AngebotErstellenZweiComponent', () => {
  let component: AngebotErstellenZweiComponent;
  let fixture: ComponentFixture<AngebotErstellenZweiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngebotErstellenZweiComponent]
    });
    fixture = TestBed.createComponent(AngebotErstellenZweiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
