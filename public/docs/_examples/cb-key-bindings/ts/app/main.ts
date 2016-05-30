// #docregion
// Import the native Angular services.
import { bootstrap } from '@angular/platform-browser-dynamic';

// Import the application services and components.
import { AppComponent } from './app.component';

bootstrap( AppComponent )
  .then(
    () => {
      console.info( 'Angular finished bootstrapping your application!' );
    },
    ( error ) => {
      console.warn( 'Angular was not able to bootstrap your application.' );
      console.error( error );
    }
  )
;
