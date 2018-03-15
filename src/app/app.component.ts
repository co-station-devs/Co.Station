import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';
import { UserService } from './user/services/user.service';
import { User } from './user/models/user.model';
import { ChatService } from './chat/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class AppComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu: MatSidenav;

  navItems = [{ name: 'Users', route: '/user' }];

  isMobileView: boolean;
  subscriptionMedia: Subscription;
  activeUser: User;

  constructor(
    private media: ObservableMedia,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isMobileView = this.media.isActive('xs') || this.media.isActive('sm');

    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });

    this.chatService.activeUserChanged.subscribe(u => this.activeUser = u);
    this.userService
      .list()
      .map(users => users.docs[0])
      .subscribe(u => this.chatService.setActiveUser(u));
  }

  onLinkClick(): void {
    if (this.isMobileView) {
      this.sideMenu.close();
    }
  }
}
