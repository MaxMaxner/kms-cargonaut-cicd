import { Component, OnInit } from '@angular/core';
import { User2Service } from '../services/user2.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss', '../app.component.scss'],
})
export class ProfileComponent implements OnInit {
    constructor(private user2Service: User2Service) {}

    profilePicture = '';
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    age: number = 0;
    birthday: string = '';
    birthdate: Date = new Date();
    notice: string = 'Hier könnte ihre Werbung stehen! Oder ein Text über sie.';
    phone: string | null = '';
    reviews: string[] = [];

    drivenWeight: number = 0;
    drivenPeople: number = 0;
    drivenKilometers: number = 0;
    smoker: boolean = false;
    smokingStatus: string = '';
    languageOptions: string[] = [];
    spokenLanguages: string[] = [];
    licence: boolean | null = false;

    editingMode: boolean = false;

    ngOnInit(): void {
        // @TODO: Get id from url and fetch data from backend
        // Initialize profile data
        this.profilePicture = 'assets/img/profile.png';
        this.drivenKilometers = 4500;
        this.drivenPeople = 10;
        this.drivenWeight = 378;
        this.reviews = [
            'Great person to work with!',
            'Highly recommended!',
            'Very talented individual.',
        ];
        this.displayUser();
    }

    async displayUser() {
        let user = this.user2Service.getUser(sessionStorage.getItem('mail')); //sessionstorage email
        console.log(user);
        this.email = (await user).mail;
        this.firstname = (await user).firstname;
        this.lastname = (await user).lastname;
        this.smoker = (await user).smocker;
        console.log(this.birthday);
        this.phone = (await user).mobilephone;
        this.licence = (await user).licence;

        var birthday = (await user).birthday;
        var year = new Date(birthday).getFullYear();
        var month = new Date(birthday).getMonth() + 1;
        var day = new Date(birthday).getDate();
        var formattedDate = ''
            .concat(year.toString(), '-')
            .concat(month.toString().padStart(2, '0'), '-')
            .concat(day.toString().padStart(2, '0'));

        this.birthday = formattedDate;
        this.smokingStatus = this.smoker == true ? 'Raucher' : 'Nicht-Raucher';
    }

    toggleEditingMode(): void {
        this.editingMode = !this.editingMode;
    }

    saveChanges(): void {
        this.editingMode = false;
        this.birthdate = new Date(this.birthday);
        this.user2Service.updateUser(
            this.firstname,
            this.lastname,
            this.smoker,
            this.birthdate,
            this.phone,
            this.spokenLanguages,
            this.profilePicture,
            this.licence,
            sessionStorage.getItem('mail')
        );
    }

    calculateAge() {
        const today: Date = new Date();
        const birthdate: Date = new Date(this.birthday);
        this.age = today.getFullYear() - birthdate.getFullYear();

        const hasNotHadBirthdayYet: boolean =
            today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate());

        if (hasNotHadBirthdayYet) {
            this.age--;
        }

        return this.age;
    }

    toggleLanguage(languages: string[]): void {
        this.spokenLanguages = languages;
    }
}
