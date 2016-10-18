///////  MUST IMPORT AND EXECUTE BEFORE TestComponentBuilder TESTS ////////////

// CRAZY BUG WORKAROUND:
// Must FIRST import and mention something (anything?) from angular
// else this file hangs systemjs for almost a  minute
import { bind } from 'angular2/angular2';
function noop() { return bind; }

///////  THIS SECTION REALLY SHOULD BE EXECUTED FOR US BY ANGULAR ////////////
// should be in `angular2/test` or `angular2/angular2` but it isn't yet
import {BrowserDomAdapter} from 'angular2/src/core/dom/browser_adapter';

if (BrowserDomAdapter) {
  // MUST be called before any specs involving the TestComponentBuilder
  BrowserDomAdapter.makeCurrent();
} else {
  console.log("BrowserDomAdapter not found; TestComponentBuilder tests will fail");
}
