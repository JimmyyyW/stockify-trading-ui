import { Component, OnInit, NgModule, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../service/stock.service';
import { Observable, of, from } from 'rxjs';
import { Stock } from '../../model/stock.model';
import { MatDialog } from '@angular/material/dialog';
import { BuyShareDialogComponent } from '../../dialog/buy-share-dialog/buy-share-dialog.component';
import { TradeService } from '../../service/trade.service';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharesService } from 'src/app/service/shares.service';
import { SellShareDialogComponent } from 'src/app/dialog/sell-share-dialog/sell-share-dialog.component';
import { CardsService } from 'src/app/service/cards.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {

  stocks: Observable<Stock[]>;
  displayedColumns: String[] = ['symbol', 'name', 'value', 'gains', 'volume', 'latest trade', 'buy'];
  volume: number;
  stock: string;
  stockList: any;
  dataSource: any

  @ViewChild('sort', { static: true }) sort: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private stockService: StockService,
    private sharesService: SharesService,
    private userService: UserService,
    private cardsService: CardsService
  ) {
    this.stocks = this.stockService.getStocksSSE();
  }

  ngOnInit(): void {
    this.stocks.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void { }

  openBuyDialog(stockSymbol: string, currentSharePrice: number): void {
    this.cardsService.getUserCards(localStorage.getItem('username'))
      .subscribe(data => {
        if (data.length < 1 || data == undefined) {
          alert('Add at least one card before trading')
        } else {
          const dialogRef = this.dialog.open(BuyShareDialogComponent, {
            width: '400px',
            data: { stockSymbol: stockSymbol, currentSharePrice: currentSharePrice, userBalance: this.getUserBalance() }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(result)
          })
        }
      });
  }

  openSellDialog(stockSymbol: string, currentSharePrice: number): void {
    let amountHeld;
    this.getUserShares(stockSymbol).subscribe(data => {
      if (data == undefined) {
        amountHeld = of(new Number(0));
      } else {
        amountHeld = of(data);
      }
      const dialogRef = this.dialog.open(SellShareDialogComponent, {
        width: '400px',
        data: { stockSymbol: stockSymbol, currentSharePrice: currentSharePrice, amountHeld: amountHeld }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
      })
    })

  }

  getUserBalance(): Observable<number> {
    return this.userService.getUserDetails(localStorage.getItem('username')).pipe(map(user => user.balance));
  }

  getUserShares(stockSymbol: string): Observable<number> {
    const user = localStorage.getItem('username');
    return this.sharesService.getSingleUserShares(user, stockSymbol);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
