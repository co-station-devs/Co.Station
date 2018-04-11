import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
declare let MediaRecorder: any;

@Injectable()
export class SpeechService {
  private recorder;
  private socket;
  private running: boolean;
  private chunks = [];

  constructor() {
    this.socket = io.connect(environment.api_url);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
      this.recorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm;codecs=opus' });
      this.recorder.ondataavailable = this.processAudioFragment.bind(this);
    });
  }


  start() {
    // Start recording
    this.chunks = [];
    this.recorder.start(500);
  }

  stop() {
    if (this.recorder.state !== 'inactive') {
      this.recorder.stop();
    }
  }

  private processAudioFragment(e) {
    if (e.data.size > 0) {
      this.chunks.push(e.data);

      const blob = new Blob(this.chunks, {
        'type': this.chunks[0].type
      });

      const blobUrl = URL.createObjectURL(blob);
      const request = new XMLHttpRequest();


      const arrayBuffer;
      const fileReader = new FileReader();
      fileReader.onload = (result) => {
        audioContext.decodeAudioData(result.target.result as ArrayBuffer, (buffer) => {
            if (!buffer) {
              console.log('buffer is empty!');
            }
            this.socket.emit('speech', { blob: this.audioBufferToWav(buffer) });
          },
          (error) => {
            console.error(error);
          }
        );
        console.log();
      };
      fileReader.readAsArrayBuffer(blob);
    }
  }


  private audioBufferToWav(buffer, opt = null) {
    opt = opt || {};

    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = opt.float32 ? 3 : 1;
    const bitDepth = format === 3 ? 32 : 16;

    let result;
    if (numChannels === 2) {
      result = this.interleave(buffer.getChannelData(0), buffer.getChannelData(1));
    } else {
      result = buffer.getChannelData(0);
    }

    return this.encodeWAV(result, format, sampleRate, numChannels, bitDepth);
  }

  private encodeWAV(samples, format, sampleRate, numChannels, bitDepth) {
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;

    const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
    const view = new DataView(buffer);

    /* RIFF identifier */
    this.writeString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * bytesPerSample, true);
    /* RIFF type */
    this.writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    this.writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, format, true);
    /* channel count */
    view.setUint16(22, numChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * blockAlign, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, blockAlign, true);
    /* bits per sample */
    view.setUint16(34, bitDepth, true);
    /* data chunk identifier */
    this.writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * bytesPerSample, true);
    if (format === 1) { // Raw PCM
      this.floatTo16BitPCM(view, 44, samples);
    } else {
      this.writeFloat32(view, 44, samples);
    }

    return buffer;
  }

  private interleave(inputL, inputR) {
    const length = inputL.length + inputR.length;
    const result = new Float32Array(length);

    let index = 0;
    let inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  }

  private writeFloat32(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 4) {
      output.setFloat32(offset, input[i], true);
    }
  }

  private floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  private writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

}
