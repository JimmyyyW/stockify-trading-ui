import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../model/trade.model';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  
  baseUri: string = 'http://localhost:8081'
  
  constructor(private router: Router,
    private http: HttpClient) { }
    
    getUserStocks(currentUser: string): Observable<Trade[]> {
      return this.http.get<Trade[]>(`${this.baseUri}/api/v2/trades/Jammm2essss`); //currentUser
    }

    getLatestTrade(): Observable<any> {
      return this.http.get<any>(`${this.baseUri}/api/v2/trades/latest`);
    }
}
