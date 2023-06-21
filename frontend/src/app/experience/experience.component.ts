import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {IRating} from "../../interfaces/IRating";


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements  OnInit {

  public user?: IUser;
  public detailedRating: IRating[] = [];
  public displayRating: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {  }

  // this function will be called when the component is initialized
  ngOnInit() {
    const userId: string | null = this.route.snapshot.paramMap.get('id'); // get the id from the url
    if (userId) {
      this.initData(userId); // initialize the data
      this.initRating(userId);
    }
  }


  // this method calls the user service to get the user data from the backend
  public initData(userId: string) {
    this.user = this.userService.getUser(userId);
    this.displayRating = this.getRating(this.user.rating);
  }

  public initRating(userId: string) {
    this.detailedRating = this.userService.getDetailedRatings(userId);
  }


  // this function will return an array of numbers from 1 to the rating, so it can be used in the html with *ngFor
  getRating(rating: number): number[] {
    return  Array(rating).fill(0).map((x, index) => index + 1);
  }

  getCircleStyles(): object {
    const total = (this.user?.totalOffers ?? 0) + (this.user?.totalSearches ?? 0);
    const totalOffers = total ? ((this.user?.totalOffers ?? 0) / total) * 100 : 0;
    return {
      'background-image': `conic-gradient(#3a9b8f 0% ${totalOffers}%, #005b52 ${totalOffers}% 100%)`
    };
  }

}
