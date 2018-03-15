import { MongoBase } from "./mongo-base";

export class Chat extends MongoBase{
  constructor(
    public _id?: string,
    public user?: string,
    public message?: string
  ){
    super(_id);
  }
}
