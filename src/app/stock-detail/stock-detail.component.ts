import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }  from '@angular/router';
import { Stock } from '../model/stock.model';
import { StockService } from '../stock.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy {

  symbol: string;
  stock: Observable<Stock>;
  latestValue: Stock;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private stockservice: StockService, private router: Router) { }

  ngOnInit(): void {
    this.getSymbol();
    this.stock = this.fetchDetails(this.symbol);
    // this.stock.pipe(takeUntil(this.unsubscribe)).subscribe(value => {
    //   this.latestValue = value
    // });
  }

  fetchDetails(symbol: string) {
    return this.stockservice.getStockBySymbol(symbol);
  }

  getSymbol() {
    this.symbol = this.router.url.split('/')[2];

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.stock = null;
    //this.unsubscribe.next();
    //this.unsubscribe.complete();
  }

}