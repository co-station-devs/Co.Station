import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatService } from './services/chat.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { ResponseComponent } from './components/response/response.component';

const routes: Routes = [{ path: '', component: ChatComponent }];

@NgModule({
  declarations: [ChatComponent, ResponseComponent],
  imports: [SharedModule, RouterModule.forRoot(routes)],
  providers: [ChatService],
  exports: [RouterModule]
})
export class ChatModule {}
