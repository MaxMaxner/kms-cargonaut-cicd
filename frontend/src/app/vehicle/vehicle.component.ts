import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html',
    styleUrls: ['./vehicle.component.scss', '../app.component.scss'],
})
export class VehicleComponent implements OnInit {
    profilePicture: string = ''
    firstname: string = ''
    lastname: string = ''
    model: string = ''
    weight: string = ''
    seats: string = ''
    dimensions: number[] = []
    extras: string = ''
    dateOfConstruction: string = ''
    YoC: Date = new Date()
    editingMode: boolean = true

    ngOnInit(): void {
        // Initialize profile data
        this.profilePicture = 'assets/img/profile.png'
        this.firstname = 'Manfred'
        this.lastname = 'Degenhort'
        this.model = 'Opel Astra'
        this.weight = '1400'
        this.seats = '4'
        this.dimensions = [1.8, 2.4]
        this.extras =
            'Das Auto fährt nicht schneller als 40 Km/H weil es kaputt ist. Mitfahrer ungern gesehen'
        this.YoC = new Date(this.dateOfConstruction)
    }

    toggleEditingMode(): void {
        this.editingMode = !this.editingMode
    }

    saveChanges(): void {
        this.editingMode = false
    }
}
