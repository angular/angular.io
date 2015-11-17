// #docregion import
import {Component, Input} from 'angular2/angular2';
// #enddocregion import
import {Hero} from './hero';

@Component({
    selector: 'invited-hero',
// #docregion invite-template
    template: `
        <div class='invited-hero'>
            <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
            <h4 class=job-request>[request]</h4>
            <button>I'll take it!</button>
        </div>
    `,
// #enddocregion invite-template
    styles: [`
        .invited-hero {
          margin: 8px;
          border: 2px solid grey;
          box-sizing: border-box;
          padding: 0px 8px 16px 8px;
        }
        .hero-name {
            text-align: center;
        }
        .job-request {
            color: red;
            border: 2px solid red;
            padding: 4px;
            background-color: #ffdddd;
        }
    `]
})
// #docregion input-binding
export class InvitedHero {
    @Input() hero: Hero;
}
// #enddocregion input-binding