import { assign } from 'rxjs/util/assign';
import moment = require('moment');

export class ParamsParser {
  MaritalStatus: string;
  FirstName: string;
  Id: string;
  IsPlanned: boolean;
  LastName: string;
  MaritalStatus: String;
  PostalCode: Number;
  StartWorkingAtAmDate: Date;
  birthDate: Date;
  StartWorkingDate: Date;
  timeSystem: number;


  get workingTime(): number {
    return moment().diff(this.StartWorkingDate, 'years', false);
  }

  get workingTimeAm(): number {
    return moment().diff(this.StartWorkingAtAmDate, 'years', false);
  }

  get age(): number {
    return moment().diff(this.birthDate, 'years', false);
  }

  static createFrom(input): ParamsParser {
    let obj = {};
    for (const i in input) {
      if (i.indexOf('.original') > -1) {
        continue;
      }
      const prop = input[i];
      obj[i] = prop[prop.kind];
    }

    return assign(new ParamsParser(), obj);
  }
}


