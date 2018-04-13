import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @Input() message;
  @Input() extended = false;
  assistant: boolean;
  payload: any;
  finalMessage: boolean;

  constructor() {
  }

  ngOnInit() {
    this.assistant = this.message.type === 0;
    if (this.message.payload) {
      this.payload = JSON.parse(this.message.payload);

      if (this.payload.fulfillmentText.length <= 0) {
        this.message.message = this.payload.fulfillmentMessages[0].text.text[0];
      }

      this.finalMessage = (this.payload) ? (this.payload.intent) ? this.payload.intent.displayName === 'tc_finish' : false : false;
    }
  }
}
