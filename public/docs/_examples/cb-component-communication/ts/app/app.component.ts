import {Component} from 'angular2/core';
import {HeroParentComponent} from './hero-parent.component';
import {NameParentComponent} from './name-parent.component';
import {VersionParentComponent} from './version-parent.component';
import {VoteTakerComponent} from './votetaker.component';
import {CountdownParentComponent} from './countdown-parent.component';
import {MissionControlComponent} from './missioncontrol.component';
import {CommandCenterComponent} from './command-center.component';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives: [
    HeroParentComponent,
    NameParentComponent,
    VersionParentComponent,
    VoteTakerComponent,
    CountdownParentComponent,
    MissionControlComponent,
    CommandCenterComponent
  ]
})
export class AppComponent { }