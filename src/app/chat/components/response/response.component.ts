import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @Input() message;
  assistant: boolean;
  @Input() extended = false;

  constructor() {
  }

  ngOnInit() {
    this.assistant = this.message.type === 0;

    // console.log(`Message`, this.message);

  }

}
