import { Injectable } from '@angular/core';
import { IUser2 } from '../../interfaces/IUser2';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

let user: IUser2;

@Injectable({
    providedIn: 'root',
})
export class User2Service {
    public environment = {
        apiUrl: 'http://localhost:8080',
    };

    constructor(private http: HttpClient) {}

    getUserFromDB(mail: string): Promise<void | IUser2> {
        console.log('working Service on: ', this.environment.apiUrl + '/user/' + mail);

        return this.http
            .get(this.environment.apiUrl + '/user/' + mail, httpOptions)
            .toPromise()
            .then((res: any) => {
                user = res.user;
                console.log(res);
            });
    }

    async getUser(mail: string): Promise<IUser2> {
        await this.getUserFromDB(mail);
        return user;
    }
}
