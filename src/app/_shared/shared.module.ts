import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SpeechService } from './services/speech.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [SpeechService, { provide: 'SPEECH_LANG', useValue: 'nl-BE' }],
  declarations: [],
  exports: [
    // Sharing components

    // Sharing modules
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
