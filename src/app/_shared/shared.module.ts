import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserTableComponent} from './components/user-table/user-table.component';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [
    UserTableComponent
  ],
  exports: [
    // Sharing components
    UserTableComponent,

    // Sharing modules
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
