import { ChatService } from '../../services/chat.service';
import { ResponseComponent } from './response.component';
import { ChatType } from '../../models/chat.model';

let component: ResponseComponent;
const mockChatService = {}as ChatService;
describe('ResponseComponent', () => {

  beforeEach(() => {
    component = new ResponseComponent();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should parse json', () => {
    // Arrange
    component.message = {
      type: ChatType.assistant,
      payload: '{"fulfillmentMessages": "Hello"}'
    };


    // Act
    component.ngOnInit();

    // Assert
    expect(component.payload.fulfillmentMessages).toEqual('Hello');
  });

  test('shouldn\'t parse json', () => {
    // Arrange
    component.message = {
      type: ChatType.user
    };

    // Act
    component.ngOnInit();

    // Assert
    expect(component.payload).toBeUndefined();
    expect(component.assistant).toBeFalsy();
  });

  test('check if assistant', () => {
    // Arrange
    component.message = {
      type: ChatType.assistant
    };

    // Act
    component.ngOnInit();

    // Assert
    expect(component.assistant).toBeTruthy();
  });

});
