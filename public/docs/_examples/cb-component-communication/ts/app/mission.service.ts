// #docregion
import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class MissionService {

  // Observable string sources
  private _missionAnnouncedSource = new Subject<string>();
  private _missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this._missionAnnouncedSource.asObservable();
  missionConfirmed$ = this._missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this._missionAnnouncedSource.next(mission)
  }

  confirmMission(astronaut: string) {
    this._missionConfirmedSource.next(astronaut);
  }
}
// #enddocregion
