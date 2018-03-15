import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../material.module';
import { ChatComponent } from '../chat/pages/chat/chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;

  beforeEach(() => {
    component = new ChatComponent(null)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
