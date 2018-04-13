import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat, ChatType } from '../../models/chat.model';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged, map, merge, scan, share, switchMap, takeUntil } from 'rxjs/operators';
import { assign } from 'rxjs/util/assign';
import { SpeechService } from '../../../_shared/services/speech.service';
import { Subject } from 'rxjs/Subject';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

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

  private sessionId = +moment().format('x');
  private ngUnSubscribe: Subject<void> = new Subject<void>();
  private speakingInterval: Observable<number>;


  private user: User;
  private socket;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    public speechService: SpeechService
  ) {
  }

  ngOnInit() {

    this.socket = io.connect(environment.api_url);
    this.speakingInterval = IntervalObservable.create(2000);
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }


  ngAfterViewInit() {
    this.chatService.activeUser$.pipe(switchMap(u => {
      this.changeUser(u);
      return this.route.queryParams;
    })).subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.queryInput.nativeElement.value = params['query'] || '';
      if (this.queryInput.nativeElement.value.length > 0) {
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: {} });
        this.addMessage();
      }
    });
  }

  addMessage() {
    this.chatService
      .addMessage(
        new Chat(this.user, ChatType.user, this.queryInput.nativeElement.value)).subscribe(r => {
      }
    );
    this.queryInput.nativeElement.value = '';
  }

  startSpeaking() {
    this.speechService.start(this.user, this.sessionId);
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
    this.thinking$ = fromEvent(this.socket, `thinking_${user._id}`);
    console.log(`Listening on: transcription_${user._id}_${this.sessionId}`);
    fromEvent(this.socket, `transcription_${user._id}_${this.sessionId}`)
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(r => {
        this.resetInterval();
        this.queryInput.nativeElement.value = r;
      });
  }

  private setConversationStream() {
    // Get our initial data
    const initialData = this.chatService.list({ user: this.user._id, sort: 'date_created', direction: 1 }).map(x => x.docs);
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
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 100);
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
