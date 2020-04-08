import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './model/stock.model';
import { SseServiceService } from './sse-service.service';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  uri = 'http://localhost:8081';

  stocks: Observable<Stock>

  constructor(private http: HttpClient, private sseService: SseServiceService, private zone: NgZone) { }

  getStocks(): Observable<Stock> {
      return this.http.get<Stock>(`${this.uri}/api/v2/stocks`);
  }

  getStocksSSE(): Observable<Stock> {
    return Observable.create(observer => {
      const eventSource = this.sseService.getEventSource(`${this.uri}/api/v2/stocks`);

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
      const eventSource = this.sseService.getEventSource(`${this.uri}/api/v2/stocks/${symbol}`);

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
}
