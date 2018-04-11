import { inject, TestBed } from '@angular/core/testing';

import { SpeechService } from './speech.service';

window.AudioContext = jest.fn().mockImplementation(() => {
  return {};
});

navigator.mediaDevices = { getUserMedia: jest.fn() };


describe('SpeechService', () => {
  beforeEach(() => {
    navigator.mediaDevices.getUserMedia.mockReturnValue(new Promise(() => {
    }));
    TestBed.configureTestingModule({
      providers: [SpeechService]
    });
  });

  it('should be created', inject([SpeechService], (service: SpeechService) => {

    expect(service).toBeTruthy();
  }));
});
