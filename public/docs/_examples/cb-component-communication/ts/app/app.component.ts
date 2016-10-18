import { Component } from '@angular/core';

import { HeroParentComponent } from './hero-parent.component';
import { NameParentComponent } from './name-parent.component';
import { VersionParentComponent } from './version-parent.component';
import { VoteTakerComponent } from './votetaker.component';
import { CountdownLocalVarParentComponent,
        CountdownViewChildParentComponent } from './countdown-parent.component';
import { MissionControlComponent } from './missioncontrol.component';

let directives: any[] = [
    HeroParentComponent,
    NameParentComponent,
    VersionParentComponent,
    VoteTakerComponent,
    MissionControlComponent,
  ];

// Include Countdown examples
// unless in e2e tests which they break.
if (!/e2e/.test(location.search)) {
  console.log('adding countdown timer examples');
  directives.push(CountdownLocalVarParentComponent);
  directives.push(CountdownViewChildParentComponent);
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: directives
})
export class AppComponent { }
