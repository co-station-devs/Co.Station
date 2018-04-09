export class MongoBase {
  constructor(
    public _id?: string,
    public date_created?: Date,
    public date_updated?: Date
  ) {
  }
}
