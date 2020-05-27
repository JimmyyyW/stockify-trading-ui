import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  
  getAllUserDetails(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUri}/api/v2/user/all`, this.option);
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
  
  removeUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUri}/api/v2/user/delete/${id}`, this.balanceUpdateOption);
  }

  updateUser(username: string, name: string, lastName: string, password: string, email: string): Observable<any> {
    return this.http.put<any>(`${this.baseUri}/api/v2/user/update`,
      { username: username, name: name, surname: lastName, password: password, email: email },
      this.balanceUpdateOption
    );
  }
}
