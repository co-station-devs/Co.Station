import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';

describe('HomeComponent', () => {
  let component: ChatComponent;

  beforeEach(() => {
    component = new ChatComponent(null);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
