import { UserEditComponent } from './user-edit.component';
import { of } from 'rxjs/observable/of';

describe('[Isolated] UserEditComponent', () => {
  let component: UserEditComponent;
  const mockUserService = {
    read: jest.fn(),
    update: jest.fn()
  } as any;

  const mockRoute = {
    paramMap: of({ params: { get: jest.fn() } })
  } as any;

  const mockRouter = {
    navigate: jest.fn()
  } as any;

  beforeEach(() => {
    component = new UserEditComponent(mockRouter, mockRoute, mockUserService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Updating user', () => {
    // Arrange
    mockUserService.read.mockReturnValue(of({ docs: [{ _id: '123' }] }));
    mockUserService.update.mockReturnValue(of({ docs: [{ _id: '456' }] }));
    component.ngOnInit();

    // Act
    component.onSubmit({ _id: 123, name: 'glenn' } as any);

    // Asert
    expect(mockUserService.update).toHaveBeenCalledWith({ _id: 123, name: 'glenn' });
  });
});
