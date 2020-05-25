import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LOADIPHLPAPI } from 'dns';

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

  async login(username: string, password: string) {
    let isEnabled: boolean;
    this.http.get<any>(`http://localhost:8081/api/v2/user/status/${username}`)
      .subscribe(async (data) => isEnabled = await data);
    const body = new HttpParams()
      .append("username", username)
      .append("password", password)
  
    return this.http.post<any>('http://localhost:8081/api/v2/login', body.toString(), this.option)
      .pipe(map((response) => {
        if (response.message == 'Welcome to Stockify') {
          if (isEnabled == true) {
            console.log("login successful!")
            localStorage.setItem('username', username);
            this.isLoggedIn = true;
            return response;
          } else {
            alert('please follow the link in the activation email')
          }
        }
      }));
  }

register(name: string, surname: string, username: string, password: string, email: string) {
  const body = { name: name, surname: surname, username: username, password: password, email: email }
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

activate(id: string) {
  this.http.get(`http://localhost:8088/api/v2/user/activate/${id}`)
    .subscribe(data => console.log(data));
}

}
