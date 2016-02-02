// #docregion
import {Component} from 'angular2/core';
import {MissionGroup} from './missiongroup.component';
import {MessageBus} from './messagebus.service';

@Component({
  selector: 'command-center',
  templateUrl: 'app/commandcenter-template.html',
  directives: [MissionGroup]
})
export class CommandCenterComponent {
}
// #enddocregion