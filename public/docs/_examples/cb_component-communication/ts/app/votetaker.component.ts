// #docregion
import {Component, EventEmitter} from 'angular2/core';
import {Vote} from './vote'
import {SeatComponent} from './seat.component';

@Component({
  selector: 'vote-taker',
  template: `
    <h1>Should mankind colonize the Universe?</h1>
    <h2>Agree: {{agreed}}, Disagree: {{disagreed}}</h2>
    <seat *ngFor="#seat of seats"
      [name]="seat"
      (onVoted)="seatVotes($event)">
    </seat>
  `,
  directives: [SeatComponent]
})
export class VoteTakerComponent {
  agreed = 0;
  disagreed = 0;
  seats = ['Mr. IQ', 'Ms. Universe', 'Bombasto']
  
  seatVotes(vote: Vote) {
    if (vote.agree) this.agreed++
    else this.disagreed++;
  }
}
// #enddocregion