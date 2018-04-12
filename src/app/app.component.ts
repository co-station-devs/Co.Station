import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';
import { UserService } from './user/services/user.service';
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
  private searchInputValue: string;

  navItems = [{ name: 'Users', route: '/user' }];

  isMobileView: boolean;
  subscriptionMedia: Subscription;

  constructor(
    private media: ObservableMedia,
    private chatService: ChatService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.isMobileView = this.media.isActive('xs') || this.media.isActive('sm');

    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });

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

  /**
   * Function which triggers the search app depending on the confugured SearchClientUri in config.xml
   *
   * @param {*} event
   * @memberof TopbarComponent
   */
  onSearch(event: any) {
  }
}
