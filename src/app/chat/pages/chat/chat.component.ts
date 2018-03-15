import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat } from '../../models/chat.model';

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

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.userChanged(this.chatService.activeUser);
    this.chatService.activeUserChanged.subscribe(u => this.userChanged(u));
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addMessage(message: string) {
    this.chatService
      .addMessage(new Chat(this.user, 'user', message))
      .subscribe(r => this.conversation.push(r));

    this.scrollToBottom();
    this.queryInput.nativeElement.value = '';
  }

  private userChanged(user: User) {
    if (!user) return;
    this.user = user;
    this.chatService.list({user: user._id}).subscribe(c => this.conversation = c.docs);
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
