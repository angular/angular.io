// #docregion
// #docregion bootstrap-simple
// Import the native Angular services.
import { bootstrap } from "angular2/platform/browser";
import { Title } from "angular2/platform/browser";

// Import the custom application services.
import { AppComponent } from "./app.component";

var promise = bootstrap( 
	AppComponent,
	[
		// While Angular supplies a Title service for setting the HTML document 
		// title, it doesn't include this service as part of the default Browser 
		// platform providers. As such, if we want to inject it into the components
		// within our application, we have to explicitly provide the Angular
		// service when bootstrapping our application.
		Title
	]
);
// #enddocregion bootstrap-simple

// Log bootstrap completion (whether in success or failure).
promise.then(
	function handleBootstrapSuccess() {

		console.info( "Angular finished bootstrapping your application!" );

	},
	function handleBootstrapFailure( error :any ) {

		console.warn( "Angular was not able to bootstrap your application." );
		console.error( error );

	}
);
