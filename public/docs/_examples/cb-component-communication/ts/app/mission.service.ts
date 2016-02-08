// #docregion
import {Injectable, EventEmitter} from 'angular2/core'

@Injectable()
export class MissionService {
  lastMission: string;
  confirmations: string[];
  
  onMissionAnnounced = new EventEmitter<string>();
  onMissionConfirmed = new EventEmitter<string>();
  
  announceMission(mission: string) {
    this.lastMission = mission;
    this.confirmations = [];
    this.onMissionAnnounced.emit(mission)
  }
  
  confirmMission(astronaut: string) {
    this.confirmations.push(astronaut);
    this.onMissionConfirmed.emit(astronaut);
  }
}
// #enddocregion
