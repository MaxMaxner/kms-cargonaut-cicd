import { Injectable } from '@angular/core';
import { IVehicle } from '../../interfaces/IVehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

let vehicle: IVehicle;

@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    public environment = {
        apiUrl: 'http://localhost:8080',
    };

    constructor(private http: HttpClient, private router: Router) {}

    getVehicleFromDB(mail: string): Promise<void | IVehicle> {
        console.log('working Service on: ', this.environment.apiUrl + '/car/' + mail);

        return this.http
            .get(this.environment.apiUrl + '/car/' + mail, httpOptions)
            .toPromise()
            .then((res: any) => {
                vehicle = res.car;
                console.log(res);
            });
    }

    async getVehicle(mail: string | null): Promise<IVehicle> {
        if (mail != null) {
            await this.getVehicleFromDB(mail);
        } else {
            this.router.navigate(['profile']);
        }
        return vehicle;
    }
}
