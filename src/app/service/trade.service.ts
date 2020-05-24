import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../model/trade.model';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  
  baseUri: string = 'http://localhost:8081';
  option = {
    headers: new HttpHeaders()
      .append('Content-Type', 'text/plain'),
    secure: false
  }

  
  constructor(private router: Router,
    private http: HttpClient) { }
    
    getUserStocks(currentUser: string): Observable<Trade[]> {
      return this.http.get<Trade[]>(`${this.baseUri}/api/v2/trades/Jammm2essss`); //currentUser
    }

    getLatestTrade(): Observable<any> {
      return this.http.get<any>(`${this.baseUri}/api/v2/trades/latest`);
    }

    createNewTrade(symbol: string, currentPrice: number, volume: number): Observable<any> {
      let body = {
        username: localStorage.getItem('username'),
        stockSymbol: symbol,
        currentSharePrice: currentPrice,
        localDateTime: new Date().toLocaleString(),
        volume: volume,
        total: volume * currentPrice
      }
      return this.http.post<any>(`${this.baseUri}/api/v2/trade/create`, body, this.option);
    }
}
