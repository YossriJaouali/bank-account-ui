import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
         provideHttpClient(),
         provideHttpClientTesting(),
        AccountService
      ]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should deposit successfully', () => {
    service.deposit('123', 100).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/v1/accounts/123/deposit');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should withdraw successfully', () => {
    service.withdraw('456', 50).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/accounts/456/withdraw');

    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
