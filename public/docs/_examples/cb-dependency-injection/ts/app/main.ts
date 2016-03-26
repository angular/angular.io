// #docregion
import {bootstrap}     from 'angular2/platform/browser';
import {AppComponent}  from './app.component';
import {LoggerService} from './logger.service';
import {UserContext}   from './user-context.service';
import {UserService}   from './user.service';

bootstrap(AppComponent, [LoggerService,UserService,UserContext])
  .catch((err:any) => console.error(err));
