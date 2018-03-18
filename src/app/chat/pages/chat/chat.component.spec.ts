import { ChatComponent } from './chat.component';
import { ChatService } from '../../services/chat.service';
import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs/observable/from';


describe('HomeComponent', () => {
  let component: ChatComponent;
  const mockChatService = {}as ChatService;

  beforeEach(() => {
    component = new ChatComponent(mockChatService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Initialization of streams', () => {
    // Arrange
    const spy = jest.spyOn(component, 'changeUser');
    const subject =  new Subject();
    mockChatService.activeUser$ = from(subject);

    // Act
    component.ngAfterViewInit();
    subject.next('new User');

    // Assert
    expect(spy).toHaveBeenCalledWith('new User');
  });
});
