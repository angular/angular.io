// #docregion
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';

console.log('Running AOT version');
document['aot'] = true;
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
