import {MongoBase} from '../../_shared/models/mongo-base';
import { Hrx } from './hrx.model';

export class User extends MongoBase {
  constructor(
    public _id?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public showExtra?: boolean,
    public hrx?: Hrx,
    public date_created?: Date,
    public date_modified?: Date,
  ) {
    super(_id);
  }

  get fullName(): string {
    return `${this.firstName}, ${this.lastName}`;
  }
}

