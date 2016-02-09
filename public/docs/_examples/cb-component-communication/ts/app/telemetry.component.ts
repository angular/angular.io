// #docregion
import {Component, Input, provide} from 'angular2/core';
import {MessageBus, controlMessageBus} from './message-bus.service';

@Component({
  selector: 'telemetry',
  template: `
      <h2>Telemetry Group</h2>
      <button (click)="sendData()">Send temperature data</button>
    `,
// #docregion providers
  providers: [provide(MessageBus, {useValue: controlMessageBus})]
// #enddocregion providers
})
export class TelemetryComponent {
  dataToSend: number[] = [
    24.5, 32.8, 42.3, 57.8, 87.3
  ];
  nextDataIndex = 0;
  
  constructor(private messageBus: MessageBus) { }
  
  sendData() {
    if (this.nextDataIndex > this.dataToSend.length-1) {
      this.nextDataIndex = 0;
    }
    this.messageBus.sendMessage(
      `Temperature: ${this.dataToSend[this.nextDataIndex++]}`);
  }
}
// #enddocregion