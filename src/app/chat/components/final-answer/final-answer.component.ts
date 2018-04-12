import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-answer',
  templateUrl: './final-answer.component.html',
  styleUrls: ['./final-answer.component.scss']
})
export class FinalAnswerComponent implements OnInit {
  @Input() params;

  constructor() {
  }

  ngOnInit() {
    console.log('Params', this.params);
  }

}
