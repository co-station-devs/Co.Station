import { TestBed, inject } from '@angular/core/testing';

import { HrxService } from './hrx.service';

describe('HrxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrxService]
    });
  });

  it('should be created', inject([HrxService], (service: HrxService) => {
    expect(service).toBeTruthy();
  }));
});
