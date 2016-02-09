// #docregion
import {Component} from 'angular2/core';
import {TelemetryComponent} from './telemetry.component';
import {MessageBoardComponent} from './message-board.component'

@Component({
  selector: 'command-center',
  template: `
    <telemetry></telemetry>
    <message-board></message-board>
  `,
  directives: [TelemetryComponent, MessageBoardComponent]
})
export class CommandCenterComponent {
}
// #enddocregion