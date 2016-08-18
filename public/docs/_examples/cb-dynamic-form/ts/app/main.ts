import {AppModuleNgFactory} from './app.module.ngfactory';
import {platformBrowser} from '@angular/platform-browser';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);