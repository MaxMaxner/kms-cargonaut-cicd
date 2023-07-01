import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../../models/user";
import {LoginComponent} from "../login/login.component";
import {AlertService} from "./alert-service.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public environment = {
    apiUrl: 'http://localhost:8080'
  };


  constructor(private router: Router, private http: HttpClient, private alert: AlertService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user") || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  checkLogin(): Promise<void> {
    return this.http.get(`${this.environment.apiUrl}/login`, httpOptions).toPromise().then((res: any) => {
      this.router.navigate([`${this.environment.apiUrl}/start`],)
// Alertwird gezeigt.
      this.alert.show("Erfolg", res.message);
    }).catch((err: any) => {
      this.alert.show("Fehler", err.message);

    })
  };

  login(mail: string, password: string): Promise<void> {
    return this.http.post<User>(`${this.environment.apiUrl}/login`, {
      mail: mail,
      password: password
    }, httpOptions).toPromise().then((res: any) => {

      this.router.navigate([`${this.environment.apiUrl}/start`],)

      this.alert.show("Erfolg", "Nutzer wurde erfolgreich eingeloggt");
      this.router.navigate(['home'])
    }).catch((err: any) => {
      this.alert.show("Fehler", "Nutzer konnte nicht eingeloggt werden.");
    })
  };


  /*
    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      // this.userSubject.next(null);
      this.router.navigate([']);
    }
  /*


    getAll() {
      return this.http.get<User[]>(`${this.environment.apiUrl}/users`);
    }

    getById(id: string
    ) {
      return this.http.get<User>(`${this.environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: User
    ) {
      return this.http.put(`${this.environment.apiUrl}/users/${id}`, params)
        .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
            // update local storage
            const user = {...this.userValue, ...params};
            localStorage.setItem('user', JSON.stringify(user));

            // publish updated user to subscribers
            this.userSubject.next(user);
          }
          return x;
        }));
    }

    delete(id: string
    ) {
      return this.http.delete(`${this.environment.apiUrl}/users/${id}`)
        .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          if (id == this.userValue.id) {
            this.logout();
          }
          return x;
        }));
    }
    */

}
