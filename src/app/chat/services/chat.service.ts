import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../user/models/user.model';
import { BaseService } from '../../_shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat.model';

@Injectable()
export class ChatService extends BaseService<Chat> {
  service_url = `${this.api_url}api/v1/chats`;
  type = new Chat();

  activeUser: User;
  activeUserChanged: EventEmitter<User>;

  constructor(http: HttpClient) {
    super(http);

    this.activeUserChanged = new EventEmitter<User>();
  }

  setActiveUser(user: User) {
    this.activeUser = user;
    this.activeUserChanged.emit(user);
  }

  addMessage(chat: Chat){
    return this.create(chat);
  }
}
