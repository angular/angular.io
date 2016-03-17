import {Component, Directive, EventEmitter , ElementRef} from 'angular2/core';

import {Hero} from './hero';
import {InitCapsPipe} from './init-caps-pipe';

@Directive({selector: 'button'})
class DecoratorDirective {
  constructor(el: ElementRef){
    console.log(el)
  }
}
@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  inputs: ['hero', 'userName'], // inputs
  outputs: ['delete'], // outputs
  directives: [DecoratorDirective],
  styleUrls: ['app/hero-detail.component.css'],
  pipes: [InitCapsPipe]
})
export class HeroDetailComponent {

  hero: Hero;

  delete = new EventEmitter();

  onDelete() { this.delete.next(this.hero) }

  onUpdate() {
    if (this.hero) {
      this.hero.name += 'x';
    }
  }
  userName: string;
}
