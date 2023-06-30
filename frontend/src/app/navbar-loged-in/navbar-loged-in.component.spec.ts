import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogedInComponent } from './navbar-loged-in.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('NavbarLogedInComponent', () => {
  let component: NavbarLogedInComponent;
  let fixture: ComponentFixture<NavbarLogedInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLogedInComponent],
      imports: [
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(NavbarLogedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
