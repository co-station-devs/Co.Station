import { User } from "../../user/models/user.model";
import { MongoBase } from "../../_shared/models/mongo-base";

export class Chat extends MongoBase{
  constructor(
    public user?: User,
    public type?: string,
    public message?: string,
    public _id?: string
  ){
    super(_id);
  }
}
