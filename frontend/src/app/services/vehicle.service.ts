import { Injectable } from '@angular/core';
import { IVehicle } from '../../interfaces/IVehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    constructor(private http: HttpClient) {}

    getVehicleFromDB(nrplate: string): Promise<void | IVehicle> {
        console.log('working Service on: ', this.environment.apiUrl + '/car/' + nrplate);

        return this.http
            .get(this.environment.apiUrl + '/car/' + nrplate, httpOptions)
            .toPromise()
            .then((res: any) => {
                vehicle = res.car;
                console.log(res);
            });
    }

    async getVehicle(nrplate: string): Promise<IVehicle> {
        await this.getVehicleFromDB(nrplate);
        return vehicle;
    }
}
