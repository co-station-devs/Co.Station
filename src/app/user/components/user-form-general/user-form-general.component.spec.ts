import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormGeneralComponent } from './user-form-general.component';

describe('UserFormGeneralComponent', () => {
  let component: UserFormGeneralComponent;
  let fixture: ComponentFixture<UserFormGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
