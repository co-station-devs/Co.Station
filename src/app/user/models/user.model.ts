import {Address} from './adress.model';
import {Sport} from './sport.model';
import {MongoBase} from '../../_shared/models/mongo-base';

export class User extends MongoBase {
  constructor(
    public _id?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public date_created?: Date,
    public date_modified?: Date,
    public addresses?: Address[],
  ) {
    super(_id);
    this.addresses = addresses || [new Address()];

  }

  get fullName(): string {
    return `${this.firstName}, ${this.lastName}`;
  }
}

