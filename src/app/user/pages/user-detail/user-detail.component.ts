import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { ChatService } from '../../../chat/services/chat.service';
import { HrxService } from '../../services/hrx.service';
import { Hrx } from '../../models/hrx.model';
import { assign } from 'rxjs/util/assign';

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
    private userService: UserService,
    private hrxService: HrxService,
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.user$ =
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
            return this.userService.read(params.get('id'));
          }
        ));
  }

  setActiveUser(user: User) {
    this.chatService.setActiveUser(user);
  }
}
