import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TradeService } from '../../service/trade.service';
import { StockService } from '../../service/stock.service';
import { Stock } from '../../model/stock.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-buy-share-dialog',
  templateUrl: './buy-share-dialog.component.html',
  styleUrls: ['./buy-share-dialog.component.scss']
})
export class BuyShareDialogComponent implements OnInit {

  form: FormGroup;
  stockSymbol: string;
  totalTrade: number;
  balanceUdpdateOutcome: string;
  sharesUpdateOutcome: string;
  isLoading: boolean;
  invalidSharePrice: boolean;
  mode: ProgressSpinnerMode = 'indeterminate';
  


  constructor(
    public dialogRef: MatDialogRef<BuyShareDialogComponent>,
    private fb: FormBuilder,
    private stockService: StockService,
    private tradeService: TradeService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

  }

  ngOnInit(): void {
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
    const volume = this.form.get('volume').value;
    const checkedPrice = Promise.resolve(this.isSharePriceEqual(currentSharePrice, stockSymbol));
    checkedPrice.then(bool => {
      if (!bool) {
        this.invalidSharePrice = true;
      } else {
        this.isLoading = true;
        setTimeout(() => {
          this.tradeService.createNewTrade(stockSymbol, currentSharePrice, volume)
            .subscribe(data => {
              if (data.outcome == 'success') {
                console.log('it was success');
                const transactionAmount: number = currentSharePrice * volume;
                this.userService.updateUserBalance(-transactionAmount)
                  .subscribe(data => console.log(data));
                this.userService.updateHeldShares(stockSymbol, volume, currentSharePrice, 'BUY')
                  .subscribe(data => console.log(data));
  
                this.isLoading = false;
              }
            });
        }, 1000)
      }
    })
  }

  async isSharePriceEqual(sharePriceToCheck: number, stockSymbol: string): Promise<boolean> {
    let currentPrice = await this.stockService.getCurrentSharePrice(stockSymbol).toPromise();
    console.log(currentPrice);
    
    if (currentPrice != sharePriceToCheck)
      return false;
    else return true;
  }

  total(currentSharePrice: number, volume: number): number {
    this.totalTrade = currentSharePrice * volume;
    return this.totalTrade;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  validate(total: number, balance: number): boolean {
    if (total >= balance) return true;
    else return false;
  }

}

export interface DialogData {
  currentSharePrice: number,
  stockSymbol: string,
  userBalance: Observable<number>
}

export interface TradeRequest {
  username: string,
  stockSymbol: string,
  currentSharePrice: number,
  volume: number,
  total: number
}
