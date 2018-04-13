import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';
import { UserService } from './user/services/user.service';
import { ChatService } from './chat/services/chat.service';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';

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
  private searchInputValue: string;

  constructor(
    private media: ObservableMedia,
    private router: Router,
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
    this.chatService.activeUser$
      .pipe(
        switchMap(r => {
          return this.chatService.checkIntent({ query: this.searchInputValue, user: `${r._id}_${moment().format('x')}`, lang: r.lang });
        })
      )
      .subscribe(r => {
        this.router.navigate([JSON.parse(r.payload).intent ? '/chat' : '/search'], {queryParams: {query: this.searchInputValue}});
        this.searchInputValue = '';
      });
  }
}
