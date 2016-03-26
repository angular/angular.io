// #docregion
import {Component,provide} from 'angular2/core';
import {LoggerService}     from './logger.service';
import {Hero}              from './hero';
import {HeroService}       from './hero.service';
import {DateLoggerService} from './date-logger.service';
import {RunnersUp}         from './runners-up';
import {runnersUpFactory}  from './runners-up-provider.service';

@Component({
  selector:'hero-of-the-month', 
  template:`<div>Winner: <strong>{{_heroOfTheMonth.name}}</strong></div>
            <div>Reason for award: <strong>{{_heroOfTheMonth.description}}</strong></div>
            <h4>Other candidates {{_runnersUp.names}}</h4>`,
           
  providers:[
    HeroService,
    provide(Hero, {useValue:new Hero('Magma','Had a great month!','555-555-5555')}),
    provide(LoggerService, {useClass:DateLoggerService}),
    provide(RunnersUp, {useFactory:runnersUpFactory, deps:[Hero, HeroService]})
  ]
})

export class HeroOfTheMonth{
  constructor(logger:LoggerService, private _heroOfTheMonth:Hero, private _runnersUp:RunnersUp){
    logger.logInfo('starting up');
  }
}