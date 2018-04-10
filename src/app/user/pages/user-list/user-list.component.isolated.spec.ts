import { UserListComponent } from './user-list.component';
import { of } from 'rxjs/observable/of';

describe('[Isolated] UserListComponent', () => {
  let component: UserListComponent;
  const mockUserService = {
    list: jest.fn()
  } as any;

  beforeEach(() => {
    component = new UserListComponent(mockUserService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Updating filter', () => {
    // Arrange
    mockUserService.list.mockReturnValue(of({ docs: [{ _id: '123' }] }));
    component.ngOnInit();

    // Act
    component.applyFilter('Glenn');

    // Asert
    expect(mockUserService.list).toHaveBeenCalledWith();
  });
});
