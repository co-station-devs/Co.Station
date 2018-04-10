import { AppComponent } from './app.component';
import { UserService } from './user/services/user.service';
import { ChatService } from './chat/services/chat.service';
import { ObservableMedia } from '@angular/flex-layout';
import { of } from 'rxjs/observable/of';
import { EventEmitter } from '@angular/core';
import { User } from './user/models/user.model';


describe('[Isolated] HomeComponent', () => {
  let component: AppComponent;
  const mediaMock = {
    isActive: jest.fn(),
    subscribe: jest.fn()
  } as ObservableMedia;

  const chatService = {
    activeUser$: new EventEmitter(),
    setActiveUser: jest.fn()
  } as ChatService;

  const userService = {
    list: jest.fn().mockReturnValue(of())
  } as UserService;

  beforeEach(() => {
    component = new AppComponent(mediaMock, chatService, userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize correct values', () => {
    // Arrange
    mediaMock.isActive = jest.fn().mockReturnValue(false);
    // Act
    component.ngOnInit();

    // Assert
    expect(userService.list).toHaveBeenCalled();
    expect(component.isMobileView).toBeFalsy();
  });

  test('When on mobile it should be true', () => {
    // Arrange
    mediaMock.isActive = jest.fn().mockReturnValue(true);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isMobileView).toBeTruthy();
  });


  test('Set active user to the first one in the list', () => {
    // Arrange
    userService.list = jest.fn().mockReturnValue(of({ docs: [new User('123')] }));
    jest.spyOn(chatService, 'setActiveUser');

    // Act
    component.ngOnInit();

    // Assert
    expect(chatService.setActiveUser).toHaveBeenCalledWith(new User('123'));
  });

  test('Check for changes in active user', () => {
    // Arrange
    userService.list = jest.fn().mockReturnValue(of({ docs: [new User('123')] }));
    jest.spyOn(chatService, 'setActiveUser');

    // Act
    component.ngOnInit();

    // Assert
    expect(chatService.setActiveUser).toHaveBeenCalledWith(new User('123'));
  });

  describe('Click on sidebar link ', () => {
    test('On desktop', () => {
      // Arrange
      component.isMobileView = false;
      component.sideMenu = { close: jest.fn() } as any;

      // Act
      component.onLinkClick();

      // Assert
      expect(component.sideMenu.close).not.toHaveBeenCalled();
    });

    test('On mobile', () => {
      // Arrange
      component.isMobileView = true;
      component.sideMenu = { close: jest.fn() } as any;

      // Act
      component.onLinkClick();

      // Assert
      expect(component.sideMenu.close).toHaveBeenCalled();
    });

  });
});

