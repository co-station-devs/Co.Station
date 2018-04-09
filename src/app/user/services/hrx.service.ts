import { Injectable } from '@angular/core';
import { BaseService } from '../../_shared/services/base.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Hrx } from '../models/hrx.model';


@Injectable()
export class HrxService extends BaseService<User> {
  service_url = `${this.api_url}api/v1/hrx`;
  type = new Hrx();

  constructor(http: HttpClient) {
    super(http);
  }

}

