import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MaterialModule } from '../../../material.module';
import { RouterModule,  ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../../chat/services/chat.service';
import { HrxService } from '../../services/hrx.service';


describe('[Isolated] UserDetailComponent', () => {
  let component: UserDetailComponent;
  const router: ActivatedRoute = {} as ActivatedRoute;
  const userService: UserService = {} as UserService;
  const hrxService: HrxService = {} as HrxService;
  const chatService: ChatService = {} as ChatService;

  beforeEach(() => {
    component = new UserDetailComponent(router, userService, hrxService, chatService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
