// #docregion
import { Component }  from '@angular/core';
import { EVIL, GOOD } from './strings';

@Component({
  selector: 'evil-string',
  // #docregion template
  template: '<h3>Evil String Component</h3>' + EVIL + GOOD
  // #enddocregion template
})

export class EvilStringComponent { }
