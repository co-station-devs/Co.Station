import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAnswerComponent } from './final-answer.component';

describe('FinalAnswerComponent', () => {
  let component: FinalAnswerComponent;
  let fixture: ComponentFixture<FinalAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
