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

  constructor() {
  }

  ngOnInit() {
    this.assistant = this.message.type === 0;
    if (this.message.payload) {
      this.payload = JSON.parse(this.message.payload);
    }
  }

}
