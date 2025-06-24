import {TransactionType} from './transaction-type';

export interface Transaction {
  type: TransactionType;
  amount: number;
  date: string;
  accountNumber: string;
}
