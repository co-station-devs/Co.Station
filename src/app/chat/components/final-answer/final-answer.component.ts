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
      type: this.parameters.TimeSystem,
      motivation: this.parameters.MotifType,
      age: this.parameters.age,
      working: this.parameters.workingTime,
      workingAm: this.parameters.workingTimeAm
    }).subscribe(r => {


      this.timecredit = r[0];
      console.log(this.timecredit);
      this.checkMinCarreer();
    });

  }

  private checkMinCarreer() {
    const workingAm = this.timecredit.minCareerAM - this.parameters.workingTimeAm;
    const working = this.timecredit.minCareer - this.parameters.workingTime;
    if (workingAm > 0) {
      this.messages.push(`Je werkt wel nog niet lang genoeg voor ArcelorMittal, je zal nog ${workingAm} jaar moeten werken`);
    }

    if (working > 0) {
      this.messages.push(`Je moet nog ${working} jaar werken voor dit van toepassing is`);
    }
  }


}
