import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

bootstrap(AppComponent, [])
  .catch((err: any) => console.error(err));
