
import { FormControl } from '@angular/forms';

export class Snippets {
  // #docregion const
  const myControl = new FormControl();
  // #enddocregion const

  // #docregion inspect
  myControl.value;
  myControl.status;
  myControl.valid;
  myControl.pristine;
  myControl.untouched;
  // #docregion inspect
}

