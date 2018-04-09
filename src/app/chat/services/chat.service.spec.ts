import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  beforeEach(() => {
    service = new ChatService(null);
  });

  test('should be created',() => {
    expect(service).toBeTruthy();
  });
});
