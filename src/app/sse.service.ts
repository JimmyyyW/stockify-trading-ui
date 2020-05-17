import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  stockEventSource: EventSource;
  stockEventSourceBySymbol: EventSource;

  constructor() { 
    this.stockEventSource = new EventSource('http://localhost:8081/api/v2/stocks')
  }

  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  getStockListSource(): EventSource {
    return this.stockEventSource;
  }

  getStockSymbolSource(url: string): EventSource {
    this.stockEventSourceBySymbol = new EventSource(url)
    return this.stockEventSourceBySymbol;
  }
}
