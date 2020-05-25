import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { StockService } from 'src/app/service/stock.service';
import { TradeService } from 'src/app/service/trade.service';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { SharesService } from 'src/app/service/shares.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sell-share-dialog',
  templateUrl: './sell-share-dialog.component.html',
  styleUrls: ['./sell-share-dialog.component.scss']
})
export class SellShareDialogComponent implements OnInit {

  form: FormGroup;
  stockSymbol: string;
  totalTrade: number;
  balanceUdpdateOutcome: string;
  sharesUpdateOutcome: string;
  isLoading: boolean;
  invalidSharePrice: boolean;
  successfullSubmission: boolean;
  amountHeld: Observable<number>;
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    public dialogRef: MatDialogRef<SellShareDialogComponent>,
    private fb: FormBuilder,
    private stockService: StockService,
    private tradeService: TradeService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.amountHeld = data.amountHeld;
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

  async submitTradeRequest(stockSymbol: string, currentSharePrice: number) {
    this.successfullSubmission = false;
    const volume = this.form.get('volume').value;
    const checkedPrice = await this.isSharePriceEqual(currentSharePrice, stockSymbol);
    if (!checkedPrice) {
      this.invalidSharePrice = true;
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.tradeService.createNewTrade(stockSymbol, currentSharePrice, volume)
          .subscribe(data => {
            if (data.outcome == 'success') {
              console.log('it was success');
              const transactionAmount: number = currentSharePrice * volume;
              this.userService.updateUserBalance(transactionAmount)
                .subscribe(data => console.log(data));
              this.userService.updateHeldShares(stockSymbol, volume, currentSharePrice, 'SELL')
                .subscribe(data => console.log(data));
              this.stockService.updateLatestTrade(stockSymbol)
                .subscribe(data => console.log(data));
              this.isLoading = false;
              this.successfullSubmission = true;
              this.amountHeld = this.amountHeld.pipe(map(amount => amount = amount - volume));
            }
          });
      }, 1000)
    }
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

  validate(amountHeld: number, saleVolume: number): boolean {
    if (saleVolume >= amountHeld) return false;
    else return true;
  }
}


export interface DialogData {
  currentSharePrice: number,
  stockSymbol: string,
  amountHeld: Observable<number>
}

