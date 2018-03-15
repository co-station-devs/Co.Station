import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service;
  beforeEach(() => {
    service = new UserService(null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
