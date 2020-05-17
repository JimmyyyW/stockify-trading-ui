import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router }  from '@angular/router';
import { Stock } from '../model/stock.model';
import { StockService } from '../stock.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TradeService } from '../trade.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyShareDialogComponent } from '../buy-share-dialog/buy-share-dialog.component';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy {

  symbol: string;
  stock: Observable<Stock>;
  latestValue: Stock;
  volume: number;
  subscription: Subscription;
  latestTrade: Observable<string>;

  constructor(private stockservice: StockService, private router: Router,
    private tradeService: TradeService, public dialog: MatDialog) 
    { 
      this.stock = this.stockservice.getStockBySymbol(this.getSymbol());
    }

  ngOnInit(): void {
   
    
  }
  

  fetchDetails(symbol: string) {
    return this.stockservice.getStockBySymbol(symbol);
  }

  getSymbol(): string {
    return this.router.url.split('/')[2];

  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
      console.log('items destroyed');
  }

  openDialog(stockSymbol: string, currentSharePrice: number): void {
    console.log(stockSymbol);
    console.log(currentSharePrice);
    const dialogRef = this.dialog.open(BuyShareDialogComponent, {
      width: '400px',
      data: { stockSymbol: stockSymbol, currentSharePrice: currentSharePrice }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

}