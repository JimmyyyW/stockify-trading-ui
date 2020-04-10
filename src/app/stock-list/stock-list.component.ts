import { Component, OnInit, NgModule, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock.model';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  stocks: Observable<Stock>;
  displayedColumns: String[] = ['symbol', 'name', 'value', 'gains', 'details', 'buy'];

  constructor(private router: Router,
      private stockService: StockService) {}

  ngOnInit(): void {
    this.stocks = this.stockService.getStocksSSE();
  }
}
