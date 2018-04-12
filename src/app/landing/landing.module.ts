import { NgModule } from '@angular/core';
import { IntranetComponent } from './intranet/intranet.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';

const routes: Routes = [{ path: '', component: IntranetComponent }];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [IntranetComponent]
})
export class LandingModule {
}
