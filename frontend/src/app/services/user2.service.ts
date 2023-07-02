import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

let user: User;

@Injectable({
    providedIn: 'root',
})
export class User2Service {
    public environment = {
        apiUrl: 'http://localhost:8080',
    };

    constructor(private http: HttpClient, private router: Router) {}

    getUserFromDB(mail: string): Promise<void | User> {
        console.log('working Service on: ', this.environment.apiUrl + '/user/' + mail);

        return this.http
            .get(this.environment.apiUrl + '/user/' + mail, httpOptions)
            .toPromise()
            .then((res: any) => {
                user = res.user;
                console.log(res);
                console.log(user.language);
            });
    }

    async getUser(mail: string | null): Promise<User> {
        if (mail != null) {
            await this.getUserFromDB(mail);
        } else {
            this.router.navigate(['login']);
        }

        return user;
    }

    updateUser(
        firstname: string,
        lastname: string,
        smoker: boolean,
        birthday: Date,
        phone: string | null,
        spokenLanguages: string[],
        mail: string | null
    ) {
        if (mail != null) {
            this.http
                .put(
                    this.environment.apiUrl + '/user/' + mail,
                    {
                        firstname: firstname,
                        lastname: lastname,
                        smoker: smoker,
                        birthday: birthday,
                        phone: phone,
                        language: spokenLanguages,
                    },
                    httpOptions
                )
                .toPromise()
                .then((res: any) => {});
        }
    }
}
