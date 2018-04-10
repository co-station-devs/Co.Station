import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MaterialModule } from '../../../material.module';
import { ChatComponent } from './chat.component';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../user/models/user.model';
import { Chat, ChatType } from '../../models/chat.model';
import { of } from 'rxjs/observable/of';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { ResponseComponent } from '../../components/response/response.component';

describe('Shallow test', () => {
  describe('ChatComponent', () => {
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;
    let chatService: ChatService;

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          providers: [ChatService],
          imports: [MaterialModule, HttpClientModule, BrowserAnimationsModule],
          declarations: [ChatComponent, ResponseComponent]
        }).compileComponents();

        chatService = TestBed.get(ChatService);
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(ChatComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    test('should create', () => {
      expect(component).toBeTruthy();
    });

    test('Adding a message', () => {
      // Arrange
      const user: User = new User('753');
      chatService.setActiveUser(user);
      spyOn(chatService, 'addMessage').and.returnValue(of({}));

      // Act
      component.addMessage('Hello');

      // Assert
      expect(component.queryInput.nativeElement.value).toEqual('');
      expect(chatService.addMessage).toHaveBeenCalledWith(new Chat(user, ChatType.user, 'Hello'));
    });


    test('Setting user should create streams', () => {
      // Arrange
      const user: User = new User('123');

      // Act
      chatService.setActiveUser(user);

      // Assert
      expect(component.conversation$).toBeTruthy();
    });

    test('Setting user should create streams and fetch initial data', () => {
      // Arrange
      const user: User = new User('123');
      spyOn(chatService, 'list').and.returnValue(of({ docs: [new Chat(), new Chat()] }));

      // Act
      chatService.setActiveUser(user);

      // Assert
      component.conversation$.subscribe(r => {
        expect(r.length).toEqual(2);
      });
    });


    /*test('Socket io', fakeAsync(() => {
        // Arrange
        const user: User = new User('123');

        spyOn(chatService, 'list').and.returnValue(of({ docs: [new Chat(), new Chat()] }));
        chatService.setActiveUser(user);
        const socket = io.connect(environment.api_url);
        tick();

        // Assert
        socket.emit(`chatAdded_123`, { user: '123', type: ChatType.user, message: 'Hello' });

        component.conversation$.subscribe(r => {
          // Act
          expect(r.length).toEqual([2, 1]);
        });
      }
    ));*/
  });
});
