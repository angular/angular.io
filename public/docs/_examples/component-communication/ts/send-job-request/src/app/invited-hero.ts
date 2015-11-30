import {Component, Input} from 'angular2/angular2';
import {Hero} from './hero';

@Component({
    selector: 'invited-hero',
// #docregion template
    template: `
        <div class='invited-hero'>
            <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
            <h4 class=job-request
                [class.announced]='request'>
                {{getRequest()}}
            </h4>
            <button [disabled]="!request">
            I'll take it!
            </button>
        </div>
    `,
// #enddocregion template
// #docregion styles
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
            color: gray;
            border: 1px solid lightgray;
            padding: 4px;
            background-color: #dddddd;
        }
        .announced {
            color: red;
            border: 2px solid red;
            background-color: #ffdddd;
        }
    `]
})
// #enddocregion styles
// #docregion component
export class InvitedHero {
    @Input() hero : Hero;
    @Input() request: string;
    
    getRequest() {
        return this.request
          ? this.request : "No job announced";
    }
}
// #enddocregion