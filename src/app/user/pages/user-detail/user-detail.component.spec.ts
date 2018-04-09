import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MaterialModule } from '../../../material.module';
import { RouterModule,  ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../../chat/services/chat.service';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  const router: ActivatedRoute = {} as ActivatedRoute;
  const userService: UserService = {} as UserService;
  const chatService: ChatService = {} as ChatService;

  beforeEach(() => {
    component = new UserDetailComponent(router, userService, chatService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
