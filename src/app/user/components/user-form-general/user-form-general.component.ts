import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-form-general',
  templateUrl: './user-form-general.component.html',
  styleUrls: ['./user-form-general.component.scss']
})
export class UserFormGeneralComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
