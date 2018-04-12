import { Injectable } from '@angular/core';
import { MongoResponse } from '../../../models/mongo.response.model';
import { assign } from 'rxjs/util/assign';
import { Observable } from 'rxjs/Observable';
import { TimeCredit } from '../models/timecredit.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class TimeCreditService {
  private service_url = `${environment.api_url}api/v1/timecredit`;

  constructor(private http: HttpClient) {
  }

  // Gets component, takes a id string as parameter
  public find(params): Observable<TimeCredit> {
    // returns the observable of http put request
    return this.http
      .post(`${this.service_url}/find`, params)
      .map((res: MongoResponse<TimeCredit>) => res.data)
      .map(x => assign(new TimeCredit(), x));
  }

}
