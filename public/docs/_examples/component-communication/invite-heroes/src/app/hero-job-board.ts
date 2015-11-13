import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {InvitedHero} from './invited-hero';

import {Hero} from './hero';

@Component({
    selector: 'hero-job-board',
    template: `
        <div class='request-panel'>
            <h2>Hero Job Board</h2>
            <div>
                <button (click)='inviteAllHeroes()'>Invite heroes</button>
            </div>
            <h3>Job Request</h3>
            <label>Request:</label>
            <input style='width: 400px;'/>
            <button>Ask</button>
            <h3>Responding Heroes</h3>
            <div class='responding-hero'
                *ng-for='#hero of respondingHeroes'>
                <span class='hero-name'>[hero.name]</span>
                <button>Assign</button>
            </div>
        </div>
        <div class='invited-hero-list'>
            <invited-hero *ng-for='#hero of invitedHeroes'
                [hero]='hero'>
            </invited-hero>
        </div>
    `,
    styles: [`
        .job-board {
            border: 2px solid lightgray;
        }
        .request-panel {
          border: 2px solid grey;
          margin: 8px;
          padding: 8px;
        }
        .invited-hero-list {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
        }
        invited-hero {
          flex: 1 33.3%;
          flex-grow: 0;
        }
        .responding-hero {
            padding-bottom: 8px;
        }
        .hero-name {
            display: inline-block;
            width: 180px;
        }
    `],
    directives: [
        InvitedHero,
        CORE_DIRECTIVES]
})
export class HeroJobBoard{
    heroes: Hero[] = [
        new Hero(11, "Mr. Nice"),
        new Hero(12, "Narco"),
        new Hero(13, "Bombasto"),
        new Hero(14, "Celeritas"),
        new Hero(15, "Magneta"),
        new Hero(16, "RubberMan"),
        new Hero(17, "Dynama"),
        new Hero(18, "Dr IQ"),
        new Hero(19, "Magma"),
        new Hero(20, "Tornado")
    ];
    respondingHeroes: Hero[] = [
      this.heroes[1],
      this.heroes[3],
      this.heroes[5]
    ];
    invitedHeroes: Hero[] = [];
    
    inviteAllHeroes() {
        this.invitedHeroes = this.heroes;
        this.respondingHeroes = [];
    }
}