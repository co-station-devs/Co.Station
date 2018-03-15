import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Chat } from '../../../_shared/models/chat.model';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chat') private chatContainer: ElementRef;
  @ViewChild('query') private queryInput: ElementRef;

  public conversation: Chat[] = [];
  private user: User;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.activeUserChanged.subscribe(u => this.userChanged(u));
    this.userChanged(this.chatService.activeUser);
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addMessage(message: string) {
    this.conversation.push(new Chat('', 'user', message));
    this.scrollToBottom();
    this.queryInput.nativeElement.value = '';

  }

  private userChanged(user: User){
    this.user = user;
    this.chatService.list();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
