import { Component, OnInit, NgModule, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock.model';
import { MatDialog } from '@angular/material/dialog';
import { BuyShareDialogComponent } from '../buy-share-dialog/buy-share-dialog.component';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit{

  stocks: Observable<Stock[]>;
  displayedColumns: String[] = ['symbol', 'name', 'value', 'gains', 'volume', 'latest trade', 'buy'];
  volume: number;
  stock: string;
  latestTrades: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private stockService: StockService,
    private tradeService: TradeService
  ) {
        this.stocks = this.stockService.getStocksSSE();
    }

  ngOnInit(): void {
     this.tradeService.getLatestTrade()
       .subscribe(data => this.latestTrades = data);     
  }

  latestTradesForSymbol(symbol: string): string {
    return this.latestTrades[symbol];
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
