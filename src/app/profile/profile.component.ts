import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeService } from '../trade.service';
import { Trade } from '../model/trade.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../model/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  trades: Trade[];
  displayedColumns: string[] = ['stockSymbol', 'total', 'value', 'volume', 'date']
  dataSource: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private tradeService: TradeService, private userService: UserService) { }

  ngOnInit(): void {
    //this.trades = this.tradeService.getUserStocks(localStorage.getItem('username'));

    this.tradeService.getUserStocks(localStorage.getItem('username'))
      .subscribe((data) => {
        this.trades = data;
        this.dataSource = new MatTableDataSource(this.trades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

    this.userService.getUserDetails(localStorage.getItem('username')).subscribe((user) => {
      this.user = user;
    });
  };


}
