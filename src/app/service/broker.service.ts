import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor() { }

  acceptTrade(): number {
    return this.randomIntFromInterval(2000, 6000);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }  
}
