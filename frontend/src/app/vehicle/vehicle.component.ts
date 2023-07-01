import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html',
    styleUrls: ['./vehicle.component.scss', '../app.component.scss'],
})
export class VehicleComponent implements OnInit {
    constructor(private vehicleService: VehicleService) {}

    profilePicture: string = '';
    firstname: string = '';
    lastname: string = '';
    model: string = '';
    weight: number = 0;
    seats: string = '';
    dimensions: number[] = [];
    extras: string = '';
    editingMode: boolean = true;

    ngOnInit(): void {
        // @TODO: Get id from url and fetch data from backend
        // Initialize profile data
        this.profilePicture = 'assets/img/profile.png';
        this.seats = '4';

        this.displayVehicle();
    }

    async displayVehicle() {
        let vehicle = this.vehicleService.getVehicle('ADMN945');
        console.log(vehicle);
        this.model = (await vehicle).brand + ' ' + (await vehicle).model;
        this.weight = (await vehicle).weight;
        this.extras = (await vehicle).features;
        this.dimensions = [(await vehicle).maximalloadheight, (await vehicle).maximalloadwidth];
    }

    toggleEditingMode(): void {
        this.editingMode = !this.editingMode;
    }

    saveChanges(): void {
        this.editingMode = false;
    }
}
