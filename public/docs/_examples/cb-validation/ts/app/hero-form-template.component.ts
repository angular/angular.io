// #docplaster
// #docregion
import { Component } from '@angular/core';

import { Hero }    from './hero';

@Component({
  selector: 'hero-form-template',
  templateUrl: 'app/hero-form-template.component.html'
})
// #docregion class
export class HeroFormTemplateComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 
                   'Chuck Overstreet');
// #enddocregion class
  submitted = false;

  onSubmit() { this.submitted = true; }

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  newHero() {
    this.model = new Hero(42, '', '');
    this.active = false;
    setTimeout(()=> this.active=true, 0);
  }
// #docregion class
}
// #enddocregion class
// #enddocregion
