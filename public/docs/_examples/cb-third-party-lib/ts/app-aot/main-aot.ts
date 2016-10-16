import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app-aot/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
