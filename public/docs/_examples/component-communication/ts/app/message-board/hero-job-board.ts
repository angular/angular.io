// #docregion component
import {Component, provide} from 'angular2/core';
import {HeroPanel} from './hero-panel';
import {Hero} from '../hero';
import {JobService} from './job-service';
import {MessageBus, theMessageBus} from './message-bus';

@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/message-board/job-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel],
  providers: [
    JobService,
    provide(MessageBus, {useValue: theMessageBus})
  ]
})
// #enddocregion
export class HeroJobBoard {
  newRequest: string = null;
  constructor(
    private jobService: JobService,
    private messageBus: MessageBus) {
  }

  get invitedHeroes() {
    return this.jobService.invitedHeroes;
  }

  get respondingHeroes() {
    return this.jobService.respondingHeroes;
  }

  get winner() {
    return this.jobService.winner;
  }
  
  inviteHeroes() {
    this.jobService.inviteHeroes();
    this.newRequest = null;
    this.messageBus.broadcastMessage('Heroes invited.');
  }
  
  announceJob() {
    this.jobService.announceJob(this.newRequest);
    if (this.newRequest) {
      this.messageBus.broadcastMessage(
        'Job "' + this.newRequest + '" announced.');
    }
  }

  get jobStatus() {
    if (!this.jobService.request) { return "No job request announced" }
    if (this.winner) { return "Job assigned"; }
    return this.jobService.respondingHeroes.length
      ? "Responding heroes"
      : "No responding heroes";
  }

  assignJob(hero: Hero) {
    this.jobService.assignJob(hero);
    this.messageBus.broadcastMessage(
      'Job assigned to ' + hero.name + ".");
  }
}