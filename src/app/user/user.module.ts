import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UserDetailComponent} from './pages/user-detail/user-detail.component';
import {UserCreateComponent} from './pages/user-create/user-create.component';
import {UserService} from './services/user.service';
import {UserFormGeneralComponent} from './components/user-form-general/user-form-general.component';
import {UserEditComponent} from './pages/user-edit/user-edit.component';
import {SharedModule} from '../_shared/shared.module';

const routes: Routes = [
  {path: 'user', component: UserListComponent},
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'user/:id/edit', component: UserEditComponent}
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserCreateComponent,
    UserFormGeneralComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService],
  exports: [RouterModule]
})
export class UserModule {
}
