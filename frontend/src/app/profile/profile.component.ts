import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss', '../app.component.scss'],
})
export class ProfileComponent implements OnInit {
    profilePicture: string = ''
    firstname: string = ''
    lastname: string = ''
    email: string = ''
    age: number = 0
    birthday: string = ''
    birthdate: Date = new Date()
    notice: string = ''
    phone: string = ''
    reviews: string[] = []

    drivenWeight: number = 0
    drivenPeople: number = 0
    drivenKilometers: number = 0
    smokingStatus: string = ''
    languageOptions: string[] = [
        'Englisch',
        'Spanisch',
        'Französisch',
        'Deutsch',
        'Chinesisch',
        'Japanisch',
    ]
    spokenLanguages: string[] = []

    editingMode: boolean = false

    ngOnInit(): void {
        // Initialize profile data
        this.profilePicture = 'assets/img/profile.png'
        this.firstname = 'Manfred'
        this.lastname = 'Degenhort'
        this.email = 'manfred1965@outlook.com'
        this.birthday = '1965-02-01'
        this.birthdate = new Date(this.birthday)
        this.phone = '+49 0127893793'
        this.spokenLanguages = ['Deutsch']
        this.drivenKilometers = 4500
        this.drivenPeople = 10
        this.drivenWeight = 378
        this.smokingStatus = 'Raucher'
        this.notice =
            'Hallo! Willkommen auf meinem Profil. Ich bin der Kapitän der Landstraße! Folgt mit für Spaß und Kilometer!'
        this.reviews = [
            'Great person to work with!',
            'Highly recommended!',
            'Very talented individual.',
        ]
    }

    toggleEditingMode(): void {
        this.editingMode = !this.editingMode
    }

    saveChanges(): void {
        this.editingMode = false
    }

    calculateAge() {
        const today: Date = new Date()
        const birthdate: Date = new Date(this.birthday)
        this.age = today.getFullYear() - birthdate.getFullYear()

        const hasNotHadBirthdayYet: boolean =
            today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())

        if (hasNotHadBirthdayYet) {
            this.age--
        }

        return this.age
    }

    toggleLanguage(languages: string[]): void {
        this.spokenLanguages = languages
    }
}
