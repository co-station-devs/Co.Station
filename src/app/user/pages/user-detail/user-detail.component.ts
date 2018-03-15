import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user$ =
      this.route.paramMap.switchMap(
        (params: ParamMap) => {
          return this.userService.read(params.get('id'));
        }
      );
  }
}
