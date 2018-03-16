import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat, ChatType } from '../../models/chat.model';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, toArray, combineAll, combineLatest, concat, merge, scan } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chat') private chatContainer: ElementRef;
  @ViewChild('query') private queryInput: ElementRef;

  conversation$: Observable<Chat[]>;
  thinking$: Observable<boolean>;
  thinking: boolean;
  private user: User;
  private socket;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.userChanged(this.chatService.activeUser);
    this.chatService.activeUserChanged.subscribe(u => this.userChanged(u));
    this.scrollToBottom();

    this.socket = io.connect(environment.api_url);
    this.thinking$ = fromEvent(this.socket, 'thinking');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addMessage(message: string) {
    this.chatService.addMessage(new Chat(this.user, ChatType.user, message)).subscribe(r => {});

    this.scrollToBottom();
    this.queryInput.nativeElement.value = '';
  }

  private userChanged(user: User) {
    if (!user) {
      return;
    }
    this.user = user;
    this.setupConversationStream();
  }

  private setupConversationStream(){
    // Get our initial data
    var initialData = this.chatService.list({ user: this.user._id }).map(x => x.docs);
    // Grab our socket stream
    var socketIO = fromEvent(this.socket, `chatAdded_${this.user._id}`);
    // Combine our initial Data with the socket data into conversation stream
    this.conversation$ = initialData.pipe(
      merge(socketIO),
      scan((acc: Chat[], x: Chat) => acc.concat([new Chat(x.user, x.type, x.message, x._id)]))
    );
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
