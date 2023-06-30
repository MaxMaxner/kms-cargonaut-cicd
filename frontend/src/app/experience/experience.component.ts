import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {IRating} from "../../interfaces/IRating";
import {IExperience} from "../../interfaces/IExperience";


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements  OnInit {

  public user?: IUser;
  public experience?: IExperience;
  public detailedRating: IRating[] = [];
  public displayRatingUnderProfilePicture: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {  }

  // this function will be called when the component is initialized
  ngOnInit() {
    const userId: string | null = this.route.snapshot.paramMap.get('id'); // get the id from the url
    if (userId) {
      this.initData(userId); // initialize the user
      if (this.user?.rating) {
        this.initDisplayRatingUnderProfilePicture(this.user!.rating); // initialize the rating under the profile picture
        this.initRating(userId); // initialize the user rating
        this.initExperience(userId); // initialize the user experience
      }
    }
  }


  // this method calls the user.service to get the user data from the backend
  public initData(userId: string): void {
    this.user = this.userService.getUser(userId);
  }

  public initDisplayRatingUnderProfilePicture(rating: number): void {
    this.displayRatingUnderProfilePicture = Array(rating).fill(0).map((x, index) => index + 1);
  }

  // this method calls the user.service to get the user rating data from the backend
  public initRating(userId: string): void {
    this.detailedRating = this.userService.getDetailedRatings(userId);
  }

  // this method calls the user.service to get the user experience data from the backend
  public initExperience(userId: string): void {
    this.experience = this.userService.getExperience(userId);
  }

  // This creates the styles for the circle-shaped diagram in the html
  getCircleStyles(): object {
    const total = (this.user?.totalOffers ?? 0) + (this.user?.totalSearches ?? 0);
    const totalOffers = total ? ((this.user?.totalOffers ?? 0) / total) * 100 : 0;
    return {
      'background-image': `conic-gradient(#3a9b8f 0% ${totalOffers}%, #005b52 ${totalOffers}% 100%)`
    };
  }

}
