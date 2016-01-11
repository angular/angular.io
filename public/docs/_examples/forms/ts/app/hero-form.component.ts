// #docplaster
// #docregion
// #docregion first, final
import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
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


  //////// DO NOT SHOW IN DOCS ////////

  // Reveal in html:
  //   AlterEgo via form.controls = {{showFormControls(hf)}}
  showFormControls(form:NgForm){
    return form.controls['alterEgo'] &&
    // #docregion form-controls
      form.controls['name'].value; // Dr. IQ
    // #enddocregion form-controls
  }
  /////////////////////////////

  // #docregion first, final
}
// #enddocregion first, final
