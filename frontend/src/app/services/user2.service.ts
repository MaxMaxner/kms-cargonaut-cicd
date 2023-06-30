import { Injectable } from '@angular/core'
import { IUser2 } from '../../interfaces/IUser2'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
    providedIn: 'root',
})
export class User2Service {
    public environment = {
        apiUrl: 'http://localhost:8080',
    }

    constructor(private http: HttpClient) {}

    getUser(mail: string): Promise<void> {
        console.log('working Service on: ', this.environment.apiUrl + '/' + mail)

        return this.http
            .get(`${this.environment.apiUrl}/user/` + mail, httpOptions)
            .toPromise()
            .then((res: any) => {
                user: res.user
            })
    }
}
