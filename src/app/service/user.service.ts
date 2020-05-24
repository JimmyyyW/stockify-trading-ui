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
  
  balanceUpdateOption = { 
    headers: new HttpHeaders()
    .append('Content-Type', 'text/plain'),
    secure: false,
    withCredentials: true
  }

  sharesUpdateOption = {
    headers: new HttpHeaders()
    .append('Content-Type', 'text/plain'),
    secure: false,
    withCredentials: true
  }
  
  constructor(private http: HttpClient) { }
  
  getUserDetails(currentUser: string): Observable<User> {
    return this.http.get<User>(`${this.baseUri}/api/v2/user/find/${currentUser}`, this.option);
  }
  
  getUserBalance(): Observable<any> {
    return new Observable()
  }
  
  updateUserBalance(transactionAmount: number): Observable<any> {
    return this.http.put<any>(`${this.baseUri}/api/v2/user/balance/reduce`, {transactionAmount: transactionAmount}, this.balanceUpdateOption);
  }
  
  
  updateHeldShares(stockSymbol: string, volume: number, currentPrice: number, type: string) {
    const body = {
      username: localStorage.getItem('username'),
      stockSymbol: stockSymbol,
      volume: volume,
      currentPrice: currentPrice,
      type: type
    }
    return this.http.put<any>(`${this.baseUri}/api/v2/users/shares/update`, body, this.sharesUpdateOption);
  }

}
