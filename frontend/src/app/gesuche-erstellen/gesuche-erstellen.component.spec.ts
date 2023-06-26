import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesucheErstellenComponent } from './gesuche-erstellen.component';

describe('GesucheErstellenComponent', () => {
  let component: GesucheErstellenComponent;
  let fixture: ComponentFixture<GesucheErstellenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GesucheErstellenComponent]
    });
    fixture = TestBed.createComponent(GesucheErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
