import { TestBed, inject } from '@angular/core/testing';

import { TimeCreditService } from './time-credit.service';

describe('TimeCreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeCreditService]
    });
  });

  it('should be created', inject([TimeCreditService], (service: TimeCreditService) => {
    expect(service).toBeTruthy();
  }));
});
