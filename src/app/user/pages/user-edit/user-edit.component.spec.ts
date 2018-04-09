import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { UserFormGeneralComponent } from '../../components/user-form-general/user-form-general.component';
import { MaterialModule } from '../../../material.module';

describe('UserEditComponent', () => {
  let component: UserEditComponent;

  beforeEach(() => {
    component = new UserEditComponent(null, null, null);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
