import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../user/models/user.model';
import { BaseService } from '../../_shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatService extends BaseService<Chat> {
  service_url = `${this.api_url}api/v1/chats`;
  type = new Chat();

  activeUser$: BehaviorSubject<User>;

  constructor(http: HttpClient) {
    super(http);

    this.activeUser$ = new BehaviorSubject<User>(null);
  }

  setActiveUser(user: User) {
    this.activeUser$.next(user);
  }

  addMessage(chat: Chat) {
    return this.create(chat);
  }
}
