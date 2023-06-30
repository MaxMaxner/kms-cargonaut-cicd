import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperienceComponent} from './experience.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

import {IUser} from "../../interfaces/IUser";
import {IRating} from "../../interfaces/IRating";
import {IExperience} from "../../interfaces/IExperience";

describe('ExperienceComponent', () => {

  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {

    const userSpy = jasmine.createSpyObj('UserService',
      [
        'getUser',
        'getDetailedRatings',
        'getExperience'
      ]);

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
    // mock user object
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


  it('should initialize displayRatingUnderProfilePicture correctly', () => {
    // mock rating
    const rating: number = 5;
    const expectedDisplayRating: number[] = [1, 2, 3, 4, 5];

    component.initDisplayRatingUnderProfilePicture(rating);

    expect(component.displayRatingUnderProfilePicture).toEqual(expectedDisplayRating);
  });


  it('should retrieve and assign user rating data correctly', () => {
    const userId: string = 'uniqueId';
    // mock rating objects
    const expectedRatings: IRating[] = [
      {
        id: 1,
        fromRaterFirstInitial: 'K',
        fromRaterLastInitial: 'D',
        comment: "Die Fahrt mit dem hier war super toll und richtig angenehm. 11/10 würde ich noch mal machen. Sehr zu empfehlen!!!!!",
        rating: 5,
      },
      {
        id: 1,
        fromRaterFirstInitial: 'L',
        fromRaterLastInitial: 'M',
        comment: "Super Klimaanlage hat das Auto. Sehr an heißen Sommertagen zu empfehlen!! Bin reibungslos am Ziel angekommen.",
        rating: 3,
      },
      {
        id: 1,
        fromRaterFirstInitial: 'K',
        fromRaterLastInitial: 'D',
        comment: "Die Fracht kam pünktlich und unbeschädigt am Zieltort an, gerne wieder.",
        rating: 1,
      },
    ];

    userServiceSpy.getDetailedRatings.withArgs(userId).and.returnValue(expectedRatings);

    component.initRating(userId);

    expect(component.detailedRating).toEqual(expectedRatings);
  });


  it('should retrieve and assign user experience data correctly', () => {
    const userId: string = 'uniqueId';
    // mock experience object
    const expectedExperience: IExperience = {
      id: 1234567890, // this could be the user id to identify the experience and safe additional id-field
      totalDistance: 3456,
      transportedWeight: null,
      passengerCount: 189,
      totalTrips: 170,
      totalOffers: 234,
      totalSearches: 156,
    };

    userServiceSpy.getExperience.withArgs(userId).and.returnValue(expectedExperience);

    component.initExperience(userId);

    expect(component.experience).toEqual(expectedExperience);
  });
});
