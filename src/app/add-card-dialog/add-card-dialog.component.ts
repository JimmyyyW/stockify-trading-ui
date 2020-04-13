import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../logout-dialog/logout-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardsService } from '../cards.service';

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
        expiryDate: ['', Validators.required],
        cvv: ['', Validators.required]
    });
  }

  exit() {}

  onNoClick(): void {

  }

  submitCardInformation() {
    this.cardService.saveNewCard(
      this.form.get('cardType').value,
      this.form.get('cardNumber').value,
      this.form.get('cardHolderName').value,
      this.form.get('expiryDate').value,
      this.form.get('cvv').value)
        .subscribe(data => console.log(data));
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
  expiryDate: string,
  cvv: number,
}