import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeService } from '../service/trade.service';
import { Trade } from '../model/trade.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { Shares, Share } from '../model/share.model';
import { SharesService } from '../service/shares.service';
import { EditUserDialogComponent } from '../dialog/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['stockSymbol', 'total', 'value', 'volume', 'date'];
  sharesDisplayedColumns: string[] = ['stockSymbol', 'volume'];
  
  user: Observable<User>;
  dataSource: any;

  trades: Trade[];

  shares: Observable<Shares>;
  sharesArray: Share[] = [];
  sharesDataSource: any;

  @ViewChild('sharesPaginator', { static: true }) sharesPaginator: MatPaginator;
  @ViewChild('tradesPaginator', { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('tradesSort', { static: true }) tradesSort: MatSort;
  @ViewChild('sharesSort', { static: true }) sharesSort: MatSort;

  constructor(private tradeService: TradeService, 
    private userService: UserService,
    private sharesService: SharesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.trades = this.tradeService.getUserStocks(localStorage.getItem('username'));

    this.tradeService.getUserStocks(localStorage.getItem('username'))
      .subscribe((data) => {
        this.trades = data;
        this.dataSource = new MatTableDataSource(this.trades);
        this.dataSource.sort = this.tradesSort;
        this.dataSource.paginator = this.paginator;
      })

    this.user = this.userService.getUserDetails(localStorage.getItem('username'));
    
    this.sharesService.getUserShares(localStorage.getItem('username'))
      .subscribe((shares) => {
        
        let userSharesResponse: Shares = shares;
        if (userSharesResponse.shares) {
        for (let share in userSharesResponse.shares) {
          this.sharesArray.push(new Share(share, userSharesResponse.shares[share]));
        }
        this.sharesDataSource = new MatTableDataSource(this.sharesArray);
        this.sharesDataSource.sort = this.sharesSort;
        this.sharesDataSource.paginator = this.sharesPaginator;
      }
      });
  };

  openEditDialog(username: string, name: string, lastName: string, email: string): void {
    console.log('hello')
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '80%',
      data: {
        username: username,
        name: name,
        lastName: lastName,
        password: '******',
        email: email
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      alert('please log back in and check for activation email if you changed password')
      window.location.reload()  
    });
  }

  applyFilterShares(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sharesDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
