import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat, ChatType } from '../../models/chat.model';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chat') private chatContainer: ElementRef;
  @ViewChild('query') private queryInput: ElementRef;

  conversation: Chat[] = [];
  thinking: boolean;
  private user: User;
  private socket;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.userChanged(this.chatService.activeUser);
    this.chatService.activeUserChanged.subscribe(u => this.userChanged(u));
    this.scrollToBottom();

    this.socket = io.connect(environment.api_url);
    this.socket.on('chatAdded', data => {
      this.conversation.push(new Chat(data.user, data.type, data.message, data._id));
    });

    this.socket.on('thinking', active => {
      this.thinking = active;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addMessage(message: string) {
    this.chatService
      .addMessage(new Chat(this.user, ChatType.user, message))
      .subscribe(r => { });

    this.scrollToBottom();
    this.queryInput.nativeElement.value = '';
  }

  private userChanged(user: User) {
    if (!user) { return; }
    this.user = user;
    this.chatService.list({ user: user._id }).subscribe(c => this.conversation = c.docs);
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
