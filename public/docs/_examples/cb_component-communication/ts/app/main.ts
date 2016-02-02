import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {MasterComponent} from './master.component';
import {Master2Component} from './master2.component';
import {RepositoryComponent} from './repository.component';
import {VoteTakerComponent} from './votetaker.component';
import {MissionControlComponent} from './missioncontrol.component';
import {CommandCenterComponent} from './commandcenter.component';
import {Sequence} from './sequence.component'

@Component({
  selector: 'app',
  templateUrl: 'app/app.html',
  directives: [
    MasterComponent,
    Master2Component,
    RepositoryComponent,
    VoteTakerComponent,
    MissionControlComponent,
    CommandCenterComponent,
    Sequence
  ]
})
class AppComponent {
}

bootstrap(AppComponent);