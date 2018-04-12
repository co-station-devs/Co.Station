import { MongoBase } from '../../_shared/models/mongo-base';
import * as moment from 'moment';

export class Hrx extends MongoBase {
  constructor(
    public _id?: string,
    public firstName?: string,
    public lastName?: string,
    public startWorkingDate?: Date,
    public startWorkingAtAmDate?: Date,
    public birthDate?: Date,
    public postalCode?: Number,
    public status?: String,
    public date_created?: Date,
    public date_modified?: Date
  ) {
    super(_id);

    console.log('Constructing');
  }

  get fullName(): string {
    return `${this.firstName}, ${this.lastName}`;
  }

  get age(): number {
    return moment().diff(this.birthDate, 'years', false);
  }
}

