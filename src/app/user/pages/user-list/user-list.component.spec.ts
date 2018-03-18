import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;


  beforeEach(() => {
    component = new UserListComponent(null);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
