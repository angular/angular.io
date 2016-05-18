import { Component } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'sg-app',
  template: `<my-toast></my-toast>`,
  directives: [ToastComponent]
})
export class AppComponent { }
