import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './response.component';
import { ChatType } from '../../models/chat.model';
import { FinalAnswerComponent } from '../final-answer/final-answer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../../material.module';

describe('[Shallow] ResponseComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      importsL [MaterialModule],
      declarations: [ ResponseComponent, FinalAnswerComponent ],
      // Tells the compiler not to error on unknown elements and attributes: shallow testing
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    component.message = {type: ChatType.assistant};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
