import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDetails } from './add-card-dialog/add-card-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  uri = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  saveNewCard(cardType: string, cardNumber: number, cardHolderName: string,
     expiryDate: string, cvv: number) {
       const body = {
         cardType: cardType,
         cardNumber: cardNumber,
         cardHolderName: cardHolderName,
         expiryDate: expiryDate,
         cvv: cvv
        }
       return this.http.post<any>(`${this.uri}/api/v2/cards/save`, body);
     }

  removeCard() {}
}
