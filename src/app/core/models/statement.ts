import {Transaction} from './transaction';

export interface Statement {
  accountNumber: string;
  transactions: Transaction[];
}
