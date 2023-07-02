import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html',
    styleUrls: ['./vehicle.component.scss', '../app.component.scss'],
})
export class VehicleComponent implements OnInit {
    constructor(private vehicleService: VehicleService, private router: Router) {}

    profilePicture: string = '';
    firstname: string = '';
    lastname: string = '';
    brand: string = '';
    model: string = '';
    weight: number = 0;
    maximalloadheight: number = 0;
    maximalloadwidth: number = 0;
    maximalloadweight: number = 0;
    nrplate: string = '';
    type: string = '';
    features: string = '';
    seats: string = '';
    editingMode: boolean = true;

    ngOnInit(): void {
        // @TODO: Get id from url and fetch data from backend
        // Initialize profile data
        this.profilePicture = 'assets/img/profile.png';
        this.seats = '4';

        this.displayVehicle();
    }

    async displayVehicle() {
        let vehicle = this.vehicleService.getVehicle(sessionStorage.getItem('mail'));
        this.brand = (await vehicle).brand;
        this.model = (await vehicle).model;
        this.weight = (await vehicle).weight;
        this.features = (await vehicle).features;
        this.maximalloadheight = (await vehicle).maximalloadheight;
        this.maximalloadwidth = (await vehicle).maximalloadwidth;
        this.maximalloadweight = (await vehicle).maximalloadweight;
        this.type = (await vehicle).type;
        this.nrplate = (await vehicle).nrplate;
    }

    toggleEditingMode(): void {
        this.editingMode = !this.editingMode;
    }

    saveChanges(): void {
        this.editingMode = false;
        setTimeout(() => {
            this.vehicleService.updateVehicle(
                this.nrplate,
                sessionStorage.getItem('mail'),
                this.brand,
                this.model,
                this.maximalloadheight,
                this.maximalloadwidth,
                this.weight,
                this.maximalloadweight,
                this.type,
                this.features
            );
        }, 200);
        this.router.navigate(['profile']);
    }
}
