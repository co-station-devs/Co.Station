import { assign } from 'rxjs/util/assign';
import * as moment from 'moment';

export class ParamsParser {
  MaritalStatus: string;
  FirstName: string;
  Id: string;
  IsPlanned: boolean;
  LastName: string;
  PostalCode: Number;
  StartWorkingAtAmDate: Date;
  BirthDate: Date;
  StartWorkingDate: Date;
  TimeSystem: number;
  MotifType: string;


  get workingTime(): number {
    return moment().diff(this.StartWorkingDate, 'years', false);
  }

  get workingTimeAm(): number {
    return moment().diff(this.StartWorkingAtAmDate, 'years', false);
  }

  get age(): number {
    return moment().diff(this.BirthDate, 'years', false);
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


