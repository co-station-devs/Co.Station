import { MongoBase } from '../../_shared/models/mongo-base';

export class Hrx extends MongoBase {
  constructor(
    public _id?: string,
    public firstName?: string,
    public lastName?: string,
    public seniorityYears?: Number,
    public seniorityEmployerYears?: Number,
    public postalCode?: Number,
    public status?: String,

    public date_created?: Date,
    public date_modified?: Date,
  ) {
    super(_id);
  }

  get fullName(): string {
    return `${this.firstName}, ${this.lastName}`;
  }
}

