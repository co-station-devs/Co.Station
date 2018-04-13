import { Injectable } from '@angular/core';
import { User } from '../../user/models/user.model';
import { BaseService } from '../../_shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { MongoResponse } from '../../../models/mongo.response.model';
import { assign } from 'rxjs/util/assign';

@Injectable()
export class ChatService extends BaseService<Chat> {
  service_url = `${this.api_url}api/v1/chats`;
  type = new Chat();
  activeUser$: BehaviorSubject<User>;
  private socket;

  constructor(http: HttpClient) {
    super(http);

    this.activeUser$ = new BehaviorSubject<User>(null);
    this.socket = io.connect(environment.api_url);
  }

  setActiveUser(user: User) {
    this.socket.emit(`activate_user`, user);

    this.activeUser$.next(user);
  }

  addMessage(chat: Chat) {
    return this.create(chat);
  }

  checkIntent(query) {
    return this.http
      .post(`${this.service_url}/check`, query)
      .map((res: MongoResponse<Chat>) => res.data)
      .map(x => assign(new Chat(), x));
  }
}
