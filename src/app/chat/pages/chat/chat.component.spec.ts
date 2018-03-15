import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { MaterialModule } from '../../../material.module';

describe('HomeComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    component = new ChatComponent(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
