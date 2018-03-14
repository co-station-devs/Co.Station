import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormGeneralComponent } from './user-form-general.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

describe('UserFormGeneralComponent', () => {
  let component: UserFormGeneralComponent;
  let fixture: ComponentFixture<UserFormGeneralComponent>;

  beforeEach(() => {
    component = new UserFormGeneralComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
