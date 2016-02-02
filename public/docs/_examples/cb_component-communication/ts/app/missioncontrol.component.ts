// #docregion
import {Component} from 'angular2/core';
import {AstronautComponent} from './astronaut.component';
import {MissionService} from './mission.service';

@Component({
  selector: 'mission-control',
  template: `
    <h1>Mission Control</h1>
    <button (click)="announce('Fly to the moon!')">
      Announce mission
    </button>
    <astronaut *ngFor="#astronaut of astronauts"
      [name]="astronaut">
    </astronaut>
    <h2>History</h2>
    <ul>
      <li *ngFor="#event of history">{{event}}</li>
    </ul>
  `,
  directives: [AstronautComponent],
  providers: [MissionService]
})
export class MissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise']
  history: string[] = [];
  
  constructor(public missionService: MissionService) {
    missionService.onMissionConfirmed.subscribe(
      (astronaut: string) => {
        this.history.push(`${astronaut} confirmed the mission`);
      })
  }
  
  announce(mission: string) {
    this.missionService.announceMission(mission);
    this.history.push('Mission announced');
  }
}
// #enddocregion