import { TestBed, inject } from '@angular/core/testing';

import { HrxService } from './hrx.service';
import { UserService } from './user.service';

describe('[Isolated] HrxService', () => {
  let service;
  beforeEach(() => {
    service = new HrxService(null);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
