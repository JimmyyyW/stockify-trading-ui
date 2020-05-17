import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUri = 'http://localhost:8081';

  option = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Content-Type', 'application/json'),
    withCredentials: true,
    secure: false
  }

  constructor(private http: HttpClient) { }

  getUserDetails(currentUser: string): Observable<User> {
    return this.http.get<User>(`${this.baseUri}/api/v2/user/find/${currentUser}`, this.option);
  }
}
