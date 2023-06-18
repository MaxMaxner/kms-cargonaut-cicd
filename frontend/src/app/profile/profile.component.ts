import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profilePicture: string = ''
    firstname: string = ''
    lastname: string = ''
    age: number = 0
    birthday: string = ''
    birthdate: Date = new Date()
    notice: string = ''
    phone: string = ''
    reviews: string[] = []

    drivenWeight: number = 200
    drivenPeople: number = 10
    drivenKilometers: number = 4500
    smokingStatus: string = 'Nicht-Raucher' // Selected smoking status
    languageOptions: string[] = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']
    spokenLanguages: string[] = ['English'] // Selected spoken languages

    editingMode: boolean = false
    isDropDownOpen: boolean = false

    ngOnInit(): void {
        // Initialize profile data
        this.profilePicture = 'assets/img/profile.png'
        this.firstname = 'Manfred'
        this.lastname = 'Degenhort'
        this.birthday = '1965-02-01'
        this.birthdate = new Date(this.birthday)
        this.phone = '+49 0127893793'

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
        // Save changes made in the editing mode
        // You can implement the saving logic here
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

    toggleLanguage(language: string): void {
        if (this.spokenLanguages.includes(language)) {
            this.spokenLanguages = this.spokenLanguages.filter((lang) => lang !== language)
        } else {
            this.spokenLanguages.push(language)
        }
    }

    toggleDropdown(): void {
        this.isDropDownOpen = !this.isDropDownOpen
    }

    removeLanguage(language: string): void {
        this.spokenLanguages = this.spokenLanguages.filter((l) => l !== language)
    }
}
