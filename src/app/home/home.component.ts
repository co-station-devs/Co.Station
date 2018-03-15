import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Chat } from '../_shared/models/chat.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  @ViewChild('chat') private chatContainer: ElementRef;
  @ViewChild('query') private queryInput: ElementRef;

  public conversation: Chat[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      // add some default conversation
      this.conversation.push(
        new Chat(
          '',
          i % 2 ? 'assistant' : 'user',
          'Lorem ipsum dolor sit amet, accusam omnesque liberavisse ei quo, te pri dolor nemore contentiones. Id ius erant dignissim, id nisl facilisi suscipiantur his. Eam cu feugiat debitis voluptua, vix in vidisse voluptua necessitatibus. Vim ne numquam fuisset voluptaria. Ea alii dissentias scribentur eam.'
        )
      );
    }
  }

  ngOnInit() {
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

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
