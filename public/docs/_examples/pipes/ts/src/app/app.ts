import {HeroBirthday as HeroBirthday2} from './hero-birthday';
import {PowerBooster} from './power-booster';
import {PowerBoostCalculator} from './power-boost-calculator';
import {HeroListComponent} from './hero-list-component';

// #docregion hero-birthday
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'hero-birthday',
  // #docregion hero-birthday-template
  template: `<p>The hero's birthday is {{ birthday | date }}</p>`
  // #enddocregion hero-birthday-template
})
export class HeroBirthday {
  birthday = new Date(1988,3,15); // April 15, 1988
}

bootstrap(HeroBirthday);
// #enddocregion hero-birthday

// #docregion async-message
@Component({
  selector: 'my-hero',
  template: 'Message: {{delayedMessage | async}}',
})
class MyHeroAsyncMessageComponent {
  delayedMessage:Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => resolve('You are my Hero!'), 500);
  });
}

// Initial view: "Message: "
// After 500ms: Message: You are my Hero!"
// #enddocregion async-message

//// Drives the rest of the pipes chapter examples ///

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives:[
    HeroBirthday2,
    PowerBooster, PowerBoostCalculator,
    MyHeroAsyncMessageComponent,
    HeroListComponent]
})
class AppComponent {
  birthday = new Date(1988,3,15); // April 15, 1988
}
bootstrap(AppComponent);
