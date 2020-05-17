import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent, CardDetails } from '../dialog/add-card-dialog/add-card-dialog.component';
import { Observable } from 'rxjs';
import { CardsService } from '../service/cards.service';

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

  cards: Observable<CardDetails[]>;

  constructor(public dialog: MatDialog,
    private cardsService: CardsService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '80%',
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
    this.cards = this.cardsService.getUserCards(localStorage.getItem('username'));
  }

  removeCard(cardNumber) {
    this.cardsService.removeCard(cardNumber)
      .subscribe((data) => {
        if (data == 1) {
          //todo: change to green success banner
          console.log('could');
          location.reload();
        }
        else if (data == 0) {
          //change to red failure banner
          console.log('couldnt');
        }
        else console.log('else');
      });
  }

}
