import { RouterModule }  from '@angular/router';

import { ContactComponent } from './contact.component';

// #docregion routing
export const routing = RouterModule.forChild([
  { path: 'contact', component: ContactComponent}
]);
// #enddocregion
