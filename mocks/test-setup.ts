import { getTestBed, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { mockMatDialog, mockMatDialogRef } from './material-mocks';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';


export class TestSetup {
  static GetInjectorForServices(compileComponents: boolean = true): TestBed {
    // Overrides default providers, directives, pipes, modules of the test injector
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ErrorHandler, useValue: null }
      ]
    });
    if (compileComponents) {
      TestBed.compileComponents();
    }
    return getTestBed();
  }
}
