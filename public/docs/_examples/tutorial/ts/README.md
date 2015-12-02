# Getting Started

1. Fork and clone this repo

1. `npm install`

1. Run the TypeScript compiler and watch for changes `npm run tsc`

1. Open 2nd terminal and launch the app in the browser `npm start`

## Notes

- Add redirectTo and/or otherwise routes
- Fix http as it evolves
- Manual typings fix for Pipes https://github.com/angular/angular/issues/4279
- Replace mocks with http when ready

## From Scratch


1. Create empty `package.json`

	```bash
	npm init -y
	```

1. Install npm packages

	```bash
	npm install --save --save-exact angular2 systemjs
  npm install --save-dev typescript tsd live-server
	```

1. Make a source folder

	```bash
	mkdir -p src/app
	```

1. Create a `tsconfig.json` file, in an editor

	```json
	{
		"compilerOptions": {
			"target": "ES5",
			"module": "commonjs",
			"sourceMap": true,
			"emitDecoratorMetadata": true,
			"experimentalDecorators": true,
			"removeComments": false,
			"noImplicitAny": true
		}
	}
	```

1. Create `app.ts` and enter

	```javascript
	import {bootstrap, Component} from 'angular2/angular2';

	@Component({
		selector: 'app',
		template: '<h1>My First Angular 2 App</h1>'
	})
	class AppComponent { }

	bootstrap(AppComponent);
	```
