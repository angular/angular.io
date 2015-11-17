// #docregion
@Component({
    selector: 'invited-hero',
    template:
    // --- Intact 
    `   <div class='invited-hero'>
            <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
            <h4 class=job-request
                [class.announced]='request'
                [class.undertaken]='undertaken'>
                {{getRequest()}}
            </h4>` +
    // --- Altered section
    `       <h2 *ng-if='winner'
                [class.won]='undertaken && winner==hero'
                [class.lost]='undertaken && winner!=hero'
                [class.else]='!undertaken'>
                {{finalState}}
            </h2>
            <button [disabled]="!request || undertaken"
                [hidden]='winner'
                (click)='undertakeJob()'>
                I'll take it!
            </button>
        </div>
    `,
    styles: [
    // --- We appended these new style rules
    `   .won {
            color: white;
            border: 2px solid green;
            background-color: green;
            padding: 8px;
        }
        .lost {
            color: white;
            border: 2px solid gray;
            background-color: gray;
            padding: 8px;
        }
        .else {
            color: gray;
            border: 2px solid gray;
            background-color: #dddddd;
            padding: 8px;
        }
    `],
    directives: [CORE_DIRECTIVES]
})
export class InvitedHero {
    // --- Existing and untouched members are omitted for the sake of brevity
    winner: Hero;
    
    constructor(private jobService: JobService) {
        // --- Listen to jobAssignedEvent
        jobService.jobAssignedEvent.subscribe(
            winner => {
                this.winner = winner;
            });
    }
    
    get finalState() {
        if (!this.winner) return "No winner announced yet."
        if (!this.undertaken) return "Job taken."
        return this.winner == this.hero
            ? "I won the job !!!"
            : "I lost the job :-(";
    }
}
// #enddocregion