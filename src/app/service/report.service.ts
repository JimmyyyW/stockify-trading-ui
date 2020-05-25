import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  uri = 'http://localhost:8081';
  
  
  headers = new HttpHeaders().append("Content-Type", "text/plain");
  
  
  constructor(private http: HttpClient) { }
  
  getChosenStockReport(symbols: string[]) {
    return this.http.post(`${this.uri}/api/v2/reports/select`, 
    symbols, 
    {responseType: 'blob', headers: this.headers}, );
  }
  
  getUserShareReport(username: string) {
    return this.http.get(`${this.uri}/api/v2/reports/shares/${username}`, {responseType: 'blob'});
  }

  getAllStockReport() {
    return this.http.get(`${this.uri}/api/v2/reports/stocks`, {responseType: 'blob'});
  }

  getSymbols() {
    return this.http.get<string[]>(`${this.uri}/api/v2/reports/symbols`);
  }
}
