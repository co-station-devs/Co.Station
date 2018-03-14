import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {MatSidenav} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu: MatSidenav;

  navItems = [
    // {name: 'Users', route: '/user'}
  ];

  isMobileView: boolean;
  subscriptionMedia: Subscription;

  constructor(private media: ObservableMedia) {
  }

  ngOnInit(): void {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));

    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
  }

  onLinkClick(): void {
    if (this.isMobileView) {
      this.sideMenu.close();
    }
  }

}
