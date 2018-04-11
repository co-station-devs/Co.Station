import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat, ChatType } from '../../models/chat.model';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged, map, merge, scan, share, takeUntil } from 'rxjs/operators';
import { assign } from 'rxjs/util/assign';
import { SpeechService } from '../../../_shared/services/speech.service';
import { Subject } from 'rxjs/Subject';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chat') chatContainer: ElementRef;
  @ViewChild('query') queryInput: ElementRef;

  conversation$: Observable<Chat[]>;
  thinking$: Observable<boolean>;
  thinking: boolean;
  speaking: boolean;

  private ngUnSubscribe: Subject<void> = new Subject<void>();
  private speakingInterval: Observable<number>;


  private user: User;
  private socket;

  constructor(
    private chatService: ChatService,
    public speechService: SpeechService
  ) {
  }

  ngOnInit() {
    this.socket = io.connect(environment.api_url);
    this.thinking$ = fromEvent(this.socket, 'thinking');
    fromEvent(this.socket, 'transcription')
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(r => {
        this.resetInterval();
        this.queryInput.nativeElement.value = r;
      });

    this.speakingInterval = IntervalObservable.create(2000);
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }


  ngAfterViewInit() {
    this.chatService.activeUser$.subscribe(u => this.changeUser(u));
  }

  addMessage() {
    this.chatService
      .addMessage(
        new Chat(this.user, ChatType.user, this.queryInput.nativeElement.value)).subscribe(r => {
      }
    );
    this.setConversationStream();
    this.queryInput.nativeElement.value = '';
  }

  startSpeaking() {
    this.speechService.start();
    this.startInterval();
  }

  finishedSpeaking() {
    this.speaking = false;
    this.speechService.stop();
    this.ngUnSubscribe.next();
    if (this.queryInput.nativeElement.value) {
      this.addMessage();
    }
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

  private startInterval() {
    this.speaking = true;
    this.speakingInterval
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((value) => this.finishedSpeaking());
  }


  private resetInterval() {
    this.ngUnSubscribe.next();
    this.startInterval();
  }
}
