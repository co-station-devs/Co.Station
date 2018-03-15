import {User} from '../models/user.model';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import {BaseService} from '../../_shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService extends BaseService<User> {
  service_url = `${this.api_url}api/v1/users`;
  type = new User();

  constructor(http: HttpClient) {
    super(http);
  }
}
