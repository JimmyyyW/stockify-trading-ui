import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardDetails } from '../dialog/add-card-dialog/add-card-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  uri = 'http://localhost:8081';

  option = {
    headers: new HttpHeaders()
      .append('Content-Type', 'text/plain'),
    secure: false
  }

  constructor(private http: HttpClient) { }

  saveNewCard(cardType: string, cardNumber: number, cardHolderName: string,
     expiryDateM: string, expiryDateY: string, cvv: number) {
       const body = {
         cardOwnerUsername: localStorage.getItem('username'),
         cardType: cardType,
         cardNumber: cardNumber,
         cardHolderName: cardHolderName,
         expiryDate: expiryDateM + "/" + expiryDateY,
         cvv: cvv
        }
       return this.http.post<any>(`${this.uri}/api/v2/cards/new`, body, this.option);
     }

  removeCard(id: string) {
    return this.http.delete<any>(`${this.uri}/api/v2/cards/remove/${id}`, this.option);
  }

  getUserCards(username: string): Observable<CardDetails[]> {
    return this.http.get<CardDetails[]>(`${this.uri}/api/v2/cards/user/${username}`);
  }

}
