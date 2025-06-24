import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Statement} from '../models/statement';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private apiUrl = 'http://localhost:8080/api/v1/accounts';
  private http = inject(HttpClient);

  retrieveStatement(accountNumber: string): Observable<Statement> {
    return this.http.get<Statement>(`${this.apiUrl}/${accountNumber}/statement`);
  }
}

