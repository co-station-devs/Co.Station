import { Component, Input, OnInit } from '@angular/core';
import { ParamsParser } from './params-parser.model';
import { TimeCreditService } from '../../../user/services/time-credit.service';

@Component({
  selector: 'app-final-answer',
  templateUrl: './final-answer.component.html',
  styleUrls: ['./final-answer.component.scss']
})
export class FinalAnswerComponent implements OnInit {
  @Input() params;
  parameters: ParamsParser;
  timecredit;
  messages: String[] = [];


  constructor(private timeCreditService: TimeCreditService) {
  }

  ngOnInit() {
    this.parameters = ParamsParser.createFrom(this.params);
    console.log(this.parameters);
    this.timeCreditService.find({
      type: 20,
      motivation: 'Type1.Child8j',
      age: 0,
      working: 5,
      workingAm: 2
    }).subscribe(r => {
      this.timecredit = r;
      this.checkMinCarreer();
    });

  }

  private checkMinCarreer() {
    const working = this.timecredit.minCareerAM - this.parameters.workingTimeAm ;
    if (working > 0) {
      this.messages.push(`Je werkt wel nog niet lang genoeg voor ArcelorMittal, je zal nog ${working} jaar moeten werken`);
    }

    if (this.parameters.workingTime < this.timecredit.minCareer) {
      this.messages.push('You arn\'t working long enough');
    }
  }


}
