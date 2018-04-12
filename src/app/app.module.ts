import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatModule } from './chat/chat.module';
import { MomentModule } from 'angular2-moment';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MomentModule,
    MaterialModule,
    ChatModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
