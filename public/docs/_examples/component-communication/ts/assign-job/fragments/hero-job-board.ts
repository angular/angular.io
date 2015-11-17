// #docregion
@Component({
    selector: 'hero-job-board',
    template:
    // --- Intact 
    `   <div class='request-panel'>
            <h2>Hero Job Board</h2>
            <div>
                <button (click)='inviteAllHeroes()'>Invite heroes</button>
            </div>
            <h3>Job Request</h3>
            <label>Request:</label>
            <input #box (keyup)="0" style='width: 400px;' [value]='jobRequest' />
            <button (click)='announceJob(box.value)'
                [disabled]='!box?.value.trim().length > 0'>
                Ask
            </button>
            <h3>{{getJobStatus()}}</h3>` +
    // --- We altered this template fragment
    `        <div *ng-if='!winner'>
                <div class='responding-hero'
                    *ng-for='#hero of respondingHeroes'>
                    <span class='hero-name'>{{hero.name}}</span>
                    <button (click)='assignJob(hero)'>Assign</button>
                </div>
            </div>
            <div *ng-if='winner'>
                The winner is 
                <span class='winner'>{{winner.name}}
            </div>
    ` +
    // --- Intact
    `   </div>
        <div class='invited-hero-list'>
            <invited-hero *ng-for='#hero of invitedHeroes'
                [hero]='hero'>
            </invited-hero>
        </div>
    `,
    styles: [
    // --- We appended this new style rule to the existing styles
    `   .winner {
            display: inline-block;
            color: white;
            font-weight: bold;
            background-color: green;
            padding: 4px 8px;
        }
    `],
    directives: [
        InvitedHero,
        CORE_DIRECTIVES],
    providers: [JobService]
})
export class HeroJobBoard{
    // --- Existing and untouched members are omitted for the sake of brevity
    get winner() {
        return this.jobService.assignedTo;
    }
    
    getJobStatus() {
        if (!this.jobRequest) {
            return "No job request announced"
        }
        else if (this.winner) {
            return "Job assigned";
        } else
        {
            return this.jobService.respondingHeroes.length > 0
                ? "Responding heroes"
                : "No responding heroes";
        }
    }
    
    assignJob(hero: Hero) {
        this.jobService.assign(hero);
    }
}
// #enddocregion