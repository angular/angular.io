import {Component, Input, Output, EventEmitter} from 'angular2/angular2';
import {Hero} from './hero';
import {HeroJobBoard} from './hero-job-board';

@Component({
    selector: 'invited-hero',
    template: `
        <div class='invited-hero'>
            <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
            <h4 class=job-request
                [class.announced]='request'
                [class.taken]='taken'>
                {{getRequest()}}
            </h4>
            <button [disabled]="taken"
                (click)='takeJob()'>
                I'll take it!
            </button>
        </div>
    `,
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
        .taken {
            color: blue;
            border: 2px solid blue;
            background-color: #ddddff;
        }
    `]
})
export class InvitedHero {
    @Input() hero: Hero;
    @Input() request: string;
    @Output() onHeroResponse = new EventEmitter();

    taken: boolean;
    
    getRequest() {
        return this.request
          ? this.request : "No job announced";
    }
    
    takeJob() {
        this.onHeroResponse.next(this.hero);
        this.taken = true;
    }
}