import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateComponent } from './user-create.component';
import { MaterialModule } from '../../../material.module';
import { UserFormGeneralComponent } from '../../components/user-form-general/user-form-general.component';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;

  beforeEach(() => {
    component = new UserCreateComponent(null, null);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
