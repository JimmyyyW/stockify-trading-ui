import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shares } from '../model/share.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharesService {

  uri = "http://localhost:8081"

  option = {
    headers: new HttpHeaders()
      //.append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Content-Type', 'text/plain'),
    withCredentials: true,
    secure: false
  }

  constructor(private http: HttpClient) { }

  getUserShares(username: string): Observable<Shares> {
    return this.http.get<Shares>(`${this.uri}/api/v2/users/shares/all/${username}`, this.option);
  }

  getSingleUserShares(username: string, stockSymbol: string): Observable<number> {
    return this.getUserShares(username).pipe(map(shares => shares.shares[stockSymbol]));
  }

}
