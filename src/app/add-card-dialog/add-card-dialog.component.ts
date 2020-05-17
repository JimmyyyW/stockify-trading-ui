import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../logout-dialog/logout-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardsService } from '../cards.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss']
})
export class AddCardDialogComponent implements OnInit {

  form: FormGroup
  cardTypes = ['VISA, MasterCard, AMEX']

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    private cardService: CardsService,
    @Inject(MAT_DIALOG_DATA) public cardDetails: CardDetails
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
        cardType: ['', Validators.required],
        cardNumber: ['', Validators.required],
        cardHolderName: ['', Validators.required],
        expiryDateM: ['', Validators.required],
        expiryDateY: ['', Validators.required],
        cvv: ['', Validators.required]
    });
  }

  exit() {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  submitCardInformation(): void {
    this.cardService.saveNewCard(
      this.form.get('cardType').value,
      this.form.get('cardNumber').value,
      this.form.get('cardHolderName').value,
      this.form.get('expiryDateM').value,
      this.form.get('expiryDateY').value,
      this.form.get('cvv').value)
        .subscribe((data: any) => {
          if (data instanceof HttpErrorResponse) {
            console.log('unable to add card');
          }
          else { 
            this.dialogRef.close(); 
            location.reload();
          }
        });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}

export interface CardDetails {
  cardType: string,
  cardNumber: number,
  cardHolderName: string,
  expiryDateM: string,
  expiryDateY: string,
  cvv: number,
}