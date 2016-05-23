import { Component } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'sg-app',
  template: `<toh-toast></toh-toast>`,
  directives: [ToastComponent]
})
export class AppComponent { }
