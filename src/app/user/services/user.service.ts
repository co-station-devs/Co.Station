import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { BaseService } from '../../_shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { assign } from 'rxjs/util/assign';
import { Hrx } from '../models/hrx.model';

@Injectable()
export class UserService extends BaseService<User> {
  service_url = `${this.api_url}api/v1/users`;
  type = new User();

  constructor(http: HttpClient) {
    super(http);
  }


  read(id: string): Observable<User> {
    return super.read(id).map(x => {
      x.hrx = assign(new Hrx(), x.hrx);
      return x;
    });
  }
}
