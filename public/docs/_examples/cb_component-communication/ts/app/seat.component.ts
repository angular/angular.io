// #docregion
import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Vote} from './vote'

@Component({
  selector: 'seat',
  template: `
    <h3>{{name}}</h3>
    <div>
      <button (click)="agree()" [disabled]="voted">
        Agree
      </button>
      <button (click)="disagree()" [disabled]="voted">
        Disagree
      </button>
    </div>
  `
})
export class SeatComponent {
  @Input() name: string;
  @Output() onVoted = new EventEmitter<Vote>();
  voted = false;
  
  agree() {
    this.onVoted.emit(new Vote(this.name, true));
    this.voted = true;
  }

  disagree() {
    this.onVoted.emit(new Vote(this.name, false));
    this.voted = true;
  }
}
// #enddocregion