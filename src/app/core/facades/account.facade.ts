import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import { AccountService } from '../services/account.service';
import { Transaction } from '../models/transaction';
import {SnackBarService} from '../services/snack-bar.service';
import {StatementService} from '../services/statement.service';

@Injectable({ providedIn: 'root' })
export class AccountFacade {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$ = this.transactionsSubject.asObservable();

  private snackBarService = inject(SnackBarService);
  private accountService = inject(AccountService);
  private statementService = inject(StatementService);

  deposit(accountNumber: string, amount: number): Observable<void> {
    return this.accountService.deposit(accountNumber, amount).pipe(
      tap(() => {
        this.snackBarService.showSnackBarInfo('The amount has been deposited successfully');
        this.loadStatement(accountNumber);
      }),
      catchError(err =>{
        this.snackBarService.showSnackBarError('Error while depositing'+ err.message);
        return of(undefined)
      } )
    );
  }

  withdraw(accountNumber: string, amount: number): Observable<void> {
    return this.accountService.withdraw(accountNumber, amount).pipe(
      tap(() => {
        this.snackBarService.showSnackBarInfo('The amount has been withdrawn successfully');
        this.loadStatement(accountNumber);
      }),
      catchError(err =>{
        this.snackBarService.showSnackBarError('Error when withdrawing'+ err.message);
        return of(undefined)
      } )
    );
  }

  loadStatement(accountNumber: string): void {
    this.statementService.retrieveStatement(accountNumber).subscribe({
      next: statement => this.transactionsSubject.next(statement.transactions),
      error: err => this.snackBarService.showSnackBarError('Error when retrieving statement' + err.message)
    });
  }
}
