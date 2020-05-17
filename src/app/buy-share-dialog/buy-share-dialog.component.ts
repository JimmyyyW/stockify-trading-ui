import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TradeService } from '../trade.service';
import { StockService } from '../stock.service';
import { Stock } from '../model/stock.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-share-dialog',
  templateUrl: './buy-share-dialog.component.html',
  styleUrls: ['./buy-share-dialog.component.scss']
})
export class BuyShareDialogComponent implements OnInit {

  form: FormGroup;
  stockSymbol: string;
  stockData: Observable<Stock>;

  constructor(
    public dialogRef: MatDialogRef<BuyShareDialogComponent>,
    private fb: FormBuilder,
    private stockService: StockService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { 
      
    }

  ngOnInit(): void {
    this.stockData = this.stockService.getStockBySymbol(this.stockSymbol);
    this.stockData.subscribe(data => console.log(data));
    this.form = this.fb.group({
      volume: ['', Validators.required],
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submitTradeRequest(stockSymbol: string, currentSharePrice: number) {
    console.log(stockSymbol);
    console.log(currentSharePrice);
    const volume = this.form.get('volume');
    console.log(volume.value);
    
  }

  total(currentSharePrice: number, volume: number): number {
    return currentSharePrice * volume;
  }

}

export interface DialogData {
  currentSharePrice: number,
  stockSymbol: string
}

export interface TradeRequest {
     username: string,
     stockSymbol: string,
     currentSharePrice: number,
     volume: number,
     total: number
}
