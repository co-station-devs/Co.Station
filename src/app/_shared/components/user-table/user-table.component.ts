import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {map} from 'rxjs/operators/map';
import {switchMap} from 'rxjs/operators/switchMap';
import {UserService} from '../../../user/services/user.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {assign} from 'rxjs/util/assign';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  displayedColumns = ['title', 'date_created'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  limit = 5;
  isLoadingResults = true;
  isRateLimitReached = false;

  @Input()filter: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userService: UserService) {
  }

  ngOnInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange
      .pipe(
        tap(() => {
            this.paginator.pageIndex = 0;
          }
        )
      );

    // .subscribe(() => this.paginator.pageIndex = 0);
    const inputObservable = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      );

    merge(this.sort.sortChange, this.paginator.page, inputObservable)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.list(assign({}, this.filter, {
            query: this.input.nativeElement.value,
            sort: this.sort.active && this.sort.active !== 'undefined' ? this.sort.active : '',
            direction: this.sort.direction,
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.limit
          }));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;
          return data.docs;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}
