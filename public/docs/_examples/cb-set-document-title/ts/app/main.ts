// #docregion
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './app.component';

// While Angular supplies a Title service for setting the HTML document title
// it doesn't include this service as part of the default Browser platform providers.
// As such, if we want to inject it into the components within our application,
// we have to explicitly provide the Angular service in our top component.
// #docregion bootstrap-title
import { Title } from 'angular2/platform/browser';

bootstrap(AppComponent, [ Title ])
// #enddocregion bootstrap-title
  .then(
    () => window.console.info( 'Angular finished bootstrapping your application!' ),
    (error) => {
      console.warn( 'Angular was not able to bootstrap your application.' );
      console.error( error );
    }
  );
