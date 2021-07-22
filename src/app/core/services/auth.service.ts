import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

export const USER_SESSION_KEY = '_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User | null>;
  private userSubject: BehaviorSubject<User | null>;

  constructor(private _http: HttpClient) {
    let storedUser = JSON.parse(localStorage.getItem(USER_SESSION_KEY) || '');

    this.userSubject = new BehaviorSubject<User | null>(storedUser);
    this.user$ = this.userSubject.asObservable();
  }

  public get user(): User | null {
    return this.userSubject.value;
  }

  setUserInSession(user: User) {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  /**
   * Remove user from local storage
   */
  clearSession() {
    localStorage.removeItem(USER_SESSION_KEY);
    this.userSubject.next(null);
  }

  login(username: string, password: string): Observable<User> {
    return this._http
      .post<any>(`${apiUrl}/api/token/`, { username, password })
      .pipe(
        map((user: any) => {
          // login successful if there's a jwt token in the response
          if (user != null && user.access) {
            // store user details and jwt token in local storage to
			// keep user logged in between page refreshes
            this.setUserInSession(user);
          }

          // Return user instance
          return user;
        })
      );
  }

  logout() {
    this.clearSession();

    // remove all data from local storage to log user out
    localStorage.clear();
    sessionStorage.clear();
  }
}
