import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RemoveUserDialogComponent } from '../dialog/remove-user-dialog/remove-user-dialog.component';
import { EditUserDialogComponent } from '../dialog/edit-user-dialog/edit-user-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../service/stock.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: Observable<User[]>;
  dataSource: any;
  displayedColumns = ['username', 'email', 'name', 'surname', 'timeStamp', 'edit'];
  addStockForm: FormGroup;

  @ViewChild('sort', { static: true }) sort: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog,
    private formBuilder: FormBuilder, private stockService: StockService) { }

  ngOnInit(): void {
    this.userService.getAllUserDetails().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.addStockForm = this.formBuilder.group({
      symbol: ['', Validators.required],
      name: ['', Validators.required],
      volume: ['', Validators.required],
      value: ['', Validators.required]
      
    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(RemoveUserDialogComponent, {
      width: '250px',
      data: { yes: 'yes', no: 'no', id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('logout dialog closed');
      if (result == 'yes') {

        this.removeUser(id);
      }
    });
  }


  openEditDialog(username: string, name: string, lastName: string, email: string): void {
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
        this.userService.getAllUserDetails().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

      });
    })

  }


  removeUser(id: string) {
    this.userService.removeUser(id).subscribe(data => {
      console.log(data);
      this.userService.getAllUserDetails().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    })
  }

  submitStockForm() {
    this.stockService.createNewStock(
      this.addStockForm.get('symbol').value,
      this.addStockForm.get('name').value,
      this.addStockForm.get('volume').value,
      this.addStockForm.get('value').value
    ).subscribe(data => {
      if (data instanceof HttpErrorResponse) {
        alert('there may have been a problem');
      } else alert('your stock has been created');
    });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}


