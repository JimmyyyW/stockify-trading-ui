import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  cardNumber: number;
  cardHolderName: string;
  expiryDate: string;
  cvv: number;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '100%',
      data: { 
        cardNumber: this.cardNumber, 
        cardHolderName: this.cardHolderName,
        expiryDate: this.expiryDate,
        cvv: this.cvv
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  ngOnInit(): void {
  }

}
