// #docregion
// Import the native Angular services.
import { Component } from "angular2/core";
import { Title } from "angular2/platform/browser";

@Component({
	selector: 'my-app',
	template: 
	`
		<p>
			Select a title to set on the current HTML document:
		</p>

		<ul>
			<li><a (click)="setTitle( 'Good morning!' )">Good morning</a>.</li>
			<li><a (click)="setTitle( 'Good afternoon!' )">Good afernoon</a>.</li>
			<li><a (click)="setTitle( 'Good evening!' )">Good evening</a>.</li>
		</ul>
	`
})
export class AppComponent {

	// I initialize the component.
	public constructor( title :Title ) {

		this._titleService = title;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I apply the given title to the HTML document.
	public setTitle( newTitle :string ) : void {

		this._titleService.setTitle( newTitle );
		
	}

}