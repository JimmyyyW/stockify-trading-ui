import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';
import { Stock } from '../model/stock.model';



@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  uri = 'http://localhost:8081';

  stocks: Observable<Stock>

  constructor(private http: HttpClient, private sseService: SseService, private zone: NgZone) { }


  getStocks(): Observable<Stock> {
      return this.http.get<Stock>(`${this.uri}/api/v2/stocks`);
  }

  getStocksSSE(): Observable<Stock[]> {
    return Observable.create(observer => {
      const eventSource = this.sseService.getStockListSource();

      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      }

      eventSource.onerror = error => {
        this.zone.run(() => {
          console.log(error)
          observer.error(error);
        })
      }
    });
  }

  getStockBySymbol(symbol: string): Observable<Stock> {
    return Observable.create(observer => {
      const eventSource = this.sseService.getStockSymbolSource(`${this.uri}/api/v2/stocks/${symbol}`);

      eventSource.onmessage = event => {
      this.zone.run(() => {
        observer.next(JSON.parse(event.data));
      })
    }
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        })
      }
    });
  }

  getCurrentSharePrice(stockSymbol: string): Observable<number> {
    return this.http.get<number>(`${this.uri}/api/v2/stocks/value/${stockSymbol}`);
  }

  updateLatestTrade(stockSymbol: string): Observable<string> {
    return this.http.put<string>(
      `${this.uri}/api/v2/stocks/update/${stockSymbol}`, 
      new Date().toLocaleString()
    )
  }

  createNewStock(symbol: string, name: string, volume: number, value: number) {
    return this.http.post<any>(`${this.uri}/api/v2/stocks/new`, 
    {symbol: symbol, name: name, volume: volume, value: value});
  }
}
