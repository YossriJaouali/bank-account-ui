import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {AccountFacade} from '../../core/facades/account.facade';
@Component({
  selector: 'app-account',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatRow,
    MatHeaderRow,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  facade = inject(AccountFacade);

  accountNumber: string = '';
  amount: number = 0;
  displayedColumns: string[] = ['date', 'type', 'amount', 'balance'];
  transactions$ = this.facade.transactions$;

  deposit() {
    this.facade.deposit(this.accountNumber, this.amount).subscribe();
  }

  withdraw() {
    this.facade.withdraw(this.accountNumber, this.amount).subscribe();
  }

  loadStatement() {
    this.facade.loadStatement(this.accountNumber);
  }
}

