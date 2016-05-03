// #docregion
import {Component} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';

import {FlyingHeroesComponent,
        FlyingHeroesImpureComponent} from './flying-heroes.component';
import {HeroAsyncMessageComponent} from './hero-async-message.component';
import {HeroBirthday} from './hero-birthday1.component';
import {HeroBirthday2} from './hero-birthday2.component';
import {HeroListComponent} from './hero-list.component';
import {PowerBooster} from './power-booster.component';
import {PowerBoostCalculator} from './power-boost-calculator.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives:[
    FlyingHeroesComponent, FlyingHeroesImpureComponent,
    HeroAsyncMessageComponent,
    HeroBirthday,
    HeroBirthday2,
    HeroListComponent,
    PowerBooster, PowerBoostCalculator
  ],
  providers:[HTTP_PROVIDERS]
})
export class AppComponent {
  birthday = new Date(1988,3,15); // April 15, 1988
}
