import { TestBed } from '@angular/core/testing';
import { AccountFacade } from './account.facade';
import { AccountService } from '../services/account.service';
import { of } from 'rxjs';
import {StatementService} from '../services/statement.service';

describe('AccountFacade', () => {
  let accountFacade: AccountFacade;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let statementServiceSpy: jasmine.SpyObj<StatementService>;

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', [
      'deposit',
      'withdraw'
    ]);
    statementServiceSpy = jasmine.createSpyObj('StatementService', [
      'retrieveStatement'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AccountFacade,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: StatementService, useValue: statementServiceSpy }
      ]
    });

    accountFacade = TestBed.inject(AccountFacade);
  });

  it('should call deposit method in accountService and load the statement', () => {
    const accountNumber = '123456';
    const amount = 100;
    accountServiceSpy.deposit.and.returnValue(of(void 0));
    spyOn(accountFacade, 'loadStatement');

    accountFacade.deposit(accountNumber, amount).subscribe(() => {
      expect(accountServiceSpy.deposit).toHaveBeenCalledWith(accountNumber, amount);
      expect(accountFacade.loadStatement).toHaveBeenCalledWith(accountNumber);
    });
  });

  it('should call withdraw method in accountService and load the statement', () => {
    const accountNumber = '123456';
    const amount = 50;
    accountServiceSpy.withdraw.and.returnValue(of(void 0));
    spyOn(accountFacade, 'loadStatement');

    accountFacade.withdraw(accountNumber, amount).subscribe(() => {
      expect(accountServiceSpy.withdraw).toHaveBeenCalledWith(accountNumber, amount);
      expect(accountFacade.loadStatement).toHaveBeenCalledWith(accountNumber);
    });
  });

  it('should update the list of transactions after invoking loadStatement', () => {
    const accountNumber = '123456';
    const mockStatement = {
      accountNumber,
      transactions: [
      ]
    };
    statementServiceSpy.retrieveStatement.and.returnValue(of(mockStatement));

    accountFacade.loadStatement(accountNumber);

    accountFacade.transactions$.subscribe((transactions) => {
      expect(transactions).toEqual(mockStatement.transactions);
    });
    expect(statementServiceSpy.retrieveStatement).toHaveBeenCalledWith(accountNumber);
  });
});
