// #docplaster
// #docregion
// #docregion first, final
import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';

import { Hero }    from './hero';

@Component({
  selector: 'hero-form',
  templateUrl: 'app/hero-form.component.html'
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
  // #enddocregion first

  // #docregion final
  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  // #docregion new-hero
  active = true;

  // #docregion new-hero-v1
  newHero() {
    this.model = new Hero(42, '', '');
  // #enddocregion new-hero-v1
    this.active = false;
    setTimeout(() => this.active = true, 0);
  // #docregion new-hero-v1
  }
  // #enddocregion new-hero-v1
  // #enddocregion new-hero
  // #enddocregion final
  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: NgForm) {

    return form && form.controls['name'] &&
    // #docregion form-controls
    form.controls['name'].value; // Dr. IQ
    // #enddocregion form-controls
  }

  /////////////////////////////

  // #docregion first, final
}
// #enddocregion first, final
