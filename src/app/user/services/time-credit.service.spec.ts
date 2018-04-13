import { TestBed, inject } from '@angular/core/testing';

import { TimeCreditService } from './time-credit.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TimeCreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TimeCreditService],
      // Tells the compiler not to error on unknown elements and attributes
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([TimeCreditService], (service: TimeCreditService) => {
    expect(service).toBeTruthy();
  }));
});
