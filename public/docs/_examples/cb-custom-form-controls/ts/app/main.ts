// #docregion
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

bootstrap(AppComponent).then(
  function handleResolve() {
    window.console.info( 'Angular finished bootstrapping your application!' )
  },
  function handleReject( error ) {
    console.warn( 'Angular was not able to bootstrap your application.' );
    console.error( error );
  }
);
