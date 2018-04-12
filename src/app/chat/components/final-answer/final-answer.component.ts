import { Component, Input, OnInit } from '@angular/core';
import { ParamsParser } from './params-parser.model';

@Component({
  selector: 'app-final-answer',
  templateUrl: './final-answer.component.html',
  styleUrls: ['./final-answer.component.scss']
})
export class FinalAnswerComponent implements OnInit {
  @Input() params;
  parameters: ParamsParser;
  messages: String[] = [];

  constructor() {
  }

  ngOnInit() {
    this.parameters = ParamsParser.createFrom(this.params);
    this.checkMinCarreer();
  }

  private checkMinCarreer() {
    if (this.parameters.workingTimeAm < 2) {
      this.messages.push('You arn\'t working long enough at Arcelor Mittal');
    }
  }


}
