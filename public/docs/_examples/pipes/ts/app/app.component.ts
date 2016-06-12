// #docregion
import { Component } from '@angular/core';
import { HTTP_PROVIDERS }    from '@angular/http';

import { FlyingHeroesComponent,
        FlyingHeroesImpureComponent } from './flying-heroes.component';
import { HeroAsyncMessageComponent } from './hero-async-message.component';
import { HeroBirthdayComponent } from './hero-birthday1.component';
import { HeroBirthday2Component } from './hero-birthday2.component';
import { HeroListComponent } from './hero-list.component';
import { PowerBoosterComponent } from './power-booster.component';
import { PowerBoostCalculatorComponent } from './power-boost-calculator.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [
    FlyingHeroesComponent, FlyingHeroesImpureComponent,
    HeroAsyncMessageComponent,
    HeroBirthdayComponent,
    HeroBirthday2Component,
    HeroListComponent,
    PowerBoosterComponent, PowerBoostCalculatorComponent
  ],
  providers: [HTTP_PROVIDERS]
})
export class AppComponent {
  birthday = new Date(1988, 3, 15); // April 15, 1988
}
