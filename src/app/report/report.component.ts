import { Component, OnInit } from '@angular/core';
import { ReportService } from '../service/report.service';
import {saveAs} from 'file-saver';
import { Observable } from 'rxjs';
import { SymbolSelectDialogComponent } from '../dialog/symbol-select-dialog/symbol-select-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  reportType: string;
  symbols: string[];
  stockSymbols: Observable<string[]>;
  chosenSymbols: string[];
  selecting: boolean;

  constructor(private reportService: ReportService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.stockSymbols = this.reportService.getSymbols();
  }

  getChosenStock(filename?: string) {
    this.openDialog(filename);

  }

  getUserShares(filename?: string) {
    const username = localStorage.getItem('username');
    this.reportService.getUserShareReport(username)
      .subscribe(data => this.downloadFile(data, username + filename));
  }

  getAllStocks(filename?: string) {
    this.reportService.getAllStockReport().subscribe(data => this.downloadFile(data, filename));
  }

  downloadFile(data: Blob, filename: string) {
    return saveAs(data, filename);
  }

  dlBtnClick(reportType: string, chosenStock?: string[]) {
    switch (reportType) {
      case 'undefined':
        alert('You must select a report type');
        break;
      case null:
        alert('You must select a report type');
        break;
      case 'all':
        this.getAllStocks('stocks_' + new Date().toLocaleString());
        break;
      case 'share':
        this.getUserShares('shares_' + new Date().toLocaleString());
      case 'select':
        this.selecting = true;
        this.getChosenStock('selection_' + new Date().toLocaleString());
    }
  }

  openDialog(filename: string) {
    const dialogRef = this.dialog.open(SymbolSelectDialogComponent, {
      width: '400px',
      data: { stockSymbols: this.stockSymbols }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        alert('no symbols selected');
      }
      this.chosenSymbols = result.data;
      this.reportService.getChosenStockReport(this.chosenSymbols)
       .subscribe(data => this.downloadFile(data, filename));
    })
  }
    
}
