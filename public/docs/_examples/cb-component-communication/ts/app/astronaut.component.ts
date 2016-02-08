// #docregion
import {Component, Input} from 'angular2/core';
import {MissionService} from './mission.service';

@Component({
  selector: 'my-astronaut',
  template: `
    <p>
      {{name}}: <strong>{{mission}}</strong>
      <button (click)="confirm()"
        [disabled]="!announced || confirmed">
        Confirm
      </button>
    </p>
  `
})
export class AstronautComponent {
  @Input() name: string;
  mission = "<no mission announced>";
  confirmed = false;
  announced = false;

  constructor(public missionService: MissionService) {
    missionService.onMissionAnnounced.subscribe(
      (mission:string) => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    })
  }

  confirm() {
    this.confirmed = true;
    this.missionService.onMissionConfirmed.emit(this.name);
  }
}
// #enddocregion