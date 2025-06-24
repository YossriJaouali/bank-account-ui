import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Statement} from '../models/statement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/v1/accounts';
  private http = inject(HttpClient);

  deposit(accountNumber: string, amount: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${accountNumber}/deposit`, { amount });
  }

  withdraw(accountNumber: string, amount: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${accountNumber}/withdraw`, { amount });
  }
}

