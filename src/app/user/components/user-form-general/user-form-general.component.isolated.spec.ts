import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormGeneralComponent } from './user-form-general.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

describe('[Isolated] UserFormGeneralComponent', () => {
  let component: UserFormGeneralComponent;

  beforeEach(() => {
    component = new UserFormGeneralComponent();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
