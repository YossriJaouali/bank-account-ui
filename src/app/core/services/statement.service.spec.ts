import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';
import {Statement} from '../models/statement';
import {StatementService} from './statement.service';

describe('StatementService', () => {
  let service: StatementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
         provideHttpClient(),
         provideHttpClientTesting(),
        StatementService
      ]
    });

    service = TestBed.inject(StatementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve statement successfully', () => {
    const accountNumber = '456';
    const statement: Statement = {accountNumber, transactions:[]};
    service.retrieveStatement(accountNumber).subscribe(
      statement => {
        expect(statement).toEqual(statement);
      }
    );

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/accounts/${accountNumber}/statement`);
    expect(req.request.method).toBe('GET');
    req.flush(statement);
  });
});
