import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { IRating } from '../../interfaces/IRating';
import { IExperience } from '../../interfaces/IExperience';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public getUser(userId: string): IUser {
        // insert code to fetch the user from the backend
        const user: IUser = {
            id: 'uniqueId',
            username: 'username',
            email: 'username@gmail.com',
            firstName: 'Lisa',
            lastName: 'Müller',
            avatar: '../../assets/images/Offers/frau.jpg',
            vehicle: 'VW Golf',
            rating: 5,
            totalDistance: 1899,
            transportedWeight: 999,
            passengerCount: 17,
            totalTrips: 15,
            totalOffers: 234,
            totalSearches: 156,
        };
        return user;
    }

    // insert code to fetch the user ratings from the backend
    public getDetailedRatings(userId: string): IRating[] {
        const detailedRatings: IRating[] = [
            {
                id: 1,
                fromRaterFirstInitial: 'K',
                fromRaterLastInitial: 'D',
                comment:
                    'Die Fahrt mit dem hier war super toll und richtig angenehm. 11/10 würde ich noch mal machen. Sehr zu empfehlen!!!!!',
                rating: 5,
            },
            {
                id: 1,
                fromRaterFirstInitial: 'L',
                fromRaterLastInitial: 'M',
                comment:
                    'Super Klimaanlage hat das Auto. Sehr an heißen Sommertagen zu empfehlen!! Bin reibungslos am Ziel angekommen.',
                rating: 3,
            },
            {
                id: 1,
                fromRaterFirstInitial: 'K',
                fromRaterLastInitial: 'D',
                comment: 'Die Fracht kam pünktlich und unbeschädigt am Zieltort an, gerne wieder.',
                rating: 1,
            },
        ];
        return detailedRatings;
    }

    getExperience(userId: string): IExperience {
        // insert code to fetch the user experience from the backend
        const experience: IExperience = {
            id: 1234567890, // this could be the user id to identify the experience and safe additional id-field
            totalDistance: 3456,
            transportedWeight: null,
            passengerCount: 189,
            totalTrips: 170,
            totalOffers: 234,
            totalSearches: 156,
        };
        return experience;
    }
}
