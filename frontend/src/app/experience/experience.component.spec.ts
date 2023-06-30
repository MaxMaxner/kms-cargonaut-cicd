import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceComponent],
      imports: [
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*********************************************************************************************************************
   * Additional tests
   ********************************************************************************************************************/

  it('should initialize the component correctly', () => {
    expect(component.user).toBeUndefined(); // Initial value of user should be undefined
    expect(component.experience).toBeUndefined(); // Initial value of experience should be undefined
    expect(component.detailedRating).toEqual([]); // Initial value of detailedRating should be an empty array
    expect(component.displayRating).toEqual([]); // Initial value of displayRating should be an empty array
  });


});
