// #docplaster
// #docregion , v1, final
import { Component } from '@angular/core';

import { Hero }    from './hero';

@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: './hero-form.component.html'
})
export class HeroFormComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  // #docregion submitted
  submitted = false;

  onSubmit() { this.submitted = true; }
  // #enddocregion submitted

  // #enddocregion final
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  // #enddocregion v1

  // #docregion final, new-hero
  newHero() {
    this.model = new Hero(42, '', '');
  }
  // #enddocregion final, new-hero

  skyDog(): Hero {
    // #docregion SkyDog
    let myHero =  new Hero(42, 'SkyDog',
                           'Fetch any object at any distance',
                           'Leslie Rollover');
    console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
    // #enddocregion SkyDog
    return myHero;
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['name'] &&
    // #docregion form-controls
    form.controls['name'].value; // Dr. IQ
    // #enddocregion form-controls
  }

  /////////////////////////////

  // #docregion v1, final
}
