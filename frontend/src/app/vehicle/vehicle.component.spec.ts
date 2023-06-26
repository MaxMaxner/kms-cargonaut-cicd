import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleComponent } from './vehicle.component';
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        FormsModule
      ],
      declarations: [VehicleComponent]
    });
    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
