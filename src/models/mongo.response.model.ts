import {HttpResponseBase} from '@angular/common/http/src/response';

export class MongoResponse<T> extends HttpResponseBase {
  readonly data: T | null;
  readonly message: string;
}
