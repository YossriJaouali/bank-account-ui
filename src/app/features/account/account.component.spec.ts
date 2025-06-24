import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountComponent } from './account.component';
import { AccountFacade } from '../../core/facades/account.facade';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TransactionType} from '../../core/models/transaction-type';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockFacade: jasmine.SpyObj<AccountFacade>;

  beforeEach(async () => {
    mockFacade = jasmine.createSpyObj('AccountFacade', [
      'deposit',
      'withdraw',
      'loadStatement',
      'transactions$'
    ]);

    mockFacade.transactions$ = of([
      {
        accountNumber: '12345',
        date: '2023-01-01',
        type: TransactionType.DEPOSIT,
        amount: 100,
        balance: 100
      }
    ]);

    await TestBed.configureTestingModule({
      imports: [AccountComponent],

      providers: [
        { provide: AccountFacade, useValue: mockFacade }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call deposit method in the account facade', () => {
    mockFacade.deposit.and.returnValue(of(undefined));
    component.accountNumber = '12345';
    component.amount = 50;

    component.deposit();

    expect(mockFacade.deposit).toHaveBeenCalledWith('12345', 50);
  });

  it('should call withdraw method in the account facade', () => {
    mockFacade.withdraw.and.returnValue(of(undefined));
    component.accountNumber = '67890';
    component.amount = 30;

    component.withdraw();

    expect(mockFacade.withdraw).toHaveBeenCalledWith('67890', 30);
  });

  it('should call loadStatement method in the account facade', () => {
    component.accountNumber = 'ABC123';

    component.loadStatement();

    expect(mockFacade.loadStatement).toHaveBeenCalledWith('ABC123');
  });

  it('should display transactions$ data', () => {
    component.transactions$.subscribe((transactions) => {
      expect(transactions.length).toBe(1);
      expect(transactions[0].accountNumber).toBe('12345');
      expect(transactions[0].type).toBe(TransactionType.DEPOSIT);
      expect(transactions[0].amount).toBe(100);
    });
  });
});
