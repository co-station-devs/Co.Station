import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MaterialModule } from '../../../material.module';
import { RouterModule,  ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';



describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let router: ActivatedRoute;
  let userService: UserService;

  beforeEach(() => {
    component = new UserDetailComponent(router, userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
