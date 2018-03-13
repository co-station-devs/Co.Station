import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatTableDataSource} from '@angular/material';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: MatTableDataSource<User>;
  displayedColumns = ['id', 'email'];

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userList = new MatTableDataSource<User>();
    this.userService.list().subscribe(r => this.userList.data = r.docs);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.userList.filter = filterValue;
  }

}
