import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  username = new BehaviorSubject<string>(localStorage.getItem('username'));

  option = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
    withCredentials: true
  }

  option2 = {
    headers: new HttpHeaders().append('Accept', '*/*').append('Content-Type', 'text/plain')
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
      const body = new HttpParams()
        .append("username", username)
        .append("password", password)

        return this.http.post<any>("http://localhost:8081/api/v2/login", body.toString(), this.option)
          .pipe(map((response) => {
            console.log(response);
            console.log("login successful!")
            localStorage.setItem('username', username);
            this.isLoggedIn = true;
            return response;
          }));
  }

  register(name: string, username: string, password: string, email: string) {
    const body = { name: name, username: username, password: password, email: email }
    console.log(body);
    return this.http.post<any>("http://localhost:8081/api/v2/register", body, this.option2)
      .pipe(map((response) => {
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.http.post<any>("http://localhost:8081/api/v2/logout", {})
    .pipe(map((response) => {
      console.log(response);
      this.username.next;
      }));
  }

}
