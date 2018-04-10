import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user$ =
      this.route.paramMap.pipe(switchMap(
        (params: ParamMap) => {
          return this.userService.read(params.get('id'));
        }
      ));
  }

  onSubmit(user: User) {
    this.userService.update(user).subscribe(r => {
      this.router.navigate([`/user/`, r]);
    });
  }

}
