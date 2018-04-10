import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

describe('[Isolated] UserService', () => {
  let service;
  beforeEach(() => {
    service = new UserService(null);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
