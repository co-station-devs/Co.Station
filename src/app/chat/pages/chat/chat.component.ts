import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat, ChatType } from '../../models/chat.model';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, merge, scan, share } from 'rxjs/operators';
import { assign } from 'rxjs/util/assign';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chat') chatContainer: ElementRef;
  @ViewChild('query') queryInput: ElementRef;

  conversation$: Observable<Chat[]>;
  thinking$: Observable<boolean>;
  thinking: boolean;

  private user: User;
  private socket;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.socket = io.connect(environment.api_url);
    this.thinking$ = fromEvent(this.socket, 'thinking');
  }

  ngAfterViewInit() {
    this.chatService.activeUser$.subscribe(u => this.changeUser(u));
  }

  addMessage(message: string) {
    this.chatService
      .addMessage(
        new Chat(this.user, ChatType.user, message)).subscribe(r => {
      }
    );
    this.queryInput.nativeElement.value = '';
  }

  private changeUser(user: User) {
    if (!user) {
      return;
    }
    this.user = user;
    this.setConversationStream();
  }

  private setConversationStream() {
    // Get our initial data
    const initialData = this.chatService.list({ user: this.user._id, sort: 'date', direction: 'desc' }).map(x => x.docs);
    // Grab our socket stream
    const socketIO = fromEvent(this.socket, `chatAdded_${this.user._id}`);
    // Combine our initial Data with the socket data into conversation stream
    this.conversation$ = initialData.pipe(
      merge(socketIO),
      scan((acc: Chat[], x: Chat) => acc.concat([assign(new Chat(), x)])),
      map(r => {
        // scroll to bottom
        setTimeout(() => {
          this.scrollToBottom();
        });
        return r;
      }),
      share()
    );
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
