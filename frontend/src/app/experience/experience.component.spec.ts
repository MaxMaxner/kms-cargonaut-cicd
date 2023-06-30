import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperienceComponent} from './experience.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

import {IUser} from "../../interfaces/IUser";

describe('ExperienceComponent', () => {

  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {

    const userSpy = jasmine.createSpyObj('UserService', ['getUser', 'getDetailedRatings', 'getExperience']);

    TestBed.configureTestingModule({
      declarations: [ExperienceComponent],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        UserService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: {get: () => 'testUserId'}}},
        },
        {
          provide: UserService,
          useValue: userSpy,
        }
      ],
    });

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*********************************************************************************************************************
   * Additional tests
   ********************************************************************************************************************/

  it('should call initData in ngOnInit', () => {
    spyOn(component, 'initData');

    component.ngOnInit();

    expect(component.initData).toHaveBeenCalledWith('testUserId');
  });


  it('should retrieve and assign user data correctly', () => {
    const userId: string = "uniqueId";

    const expectedUser: IUser = {
      id: "uniqueId",
      username: "username",
      email: "username@gmail.com",
      firstName: "Lisa",
      lastName: "Müller",
      avatar: "../../assets/images/Offers/frau.jpg",
      vehicle: "VW Golf",
      rating: 5,
      totalDistance: 1899,
      transportedWeight: 999,
      passengerCount: 17,
      totalTrips: 15,
      totalOffers: 234,
      totalSearches: 156,
    };


    // Set the mock behavior of the user service
    userServiceSpy.getUser.withArgs(userId).and.returnValue(expectedUser);

    // Call the initData method with the userId
    component.initData(userId);


    // Assert that the user property has been assigned with the expected user object
    expect(component.user).toEqual(expectedUser);


  });


});
