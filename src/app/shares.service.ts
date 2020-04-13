import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shares } from './model/share.model';

@Injectable({
  providedIn: 'root'
})
export class SharesService {

  uri = "http://localhost:8081"

  option = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Content-Type', 'application/json'),
    withCredentials: true,
    secure: false
  }

  constructor(private http: HttpClient) { }

  getUserShares(username: string) {
    return this.http.get<Shares>(`${this.uri}/api/v2/users/shares/all/Jammm2essss`, this.option);
  }
}
