(function() {
  
var InvitedHero = ng
  .Component({
    selector: 'invited-hero',
    template: `
      <div class='invited-hero'>
        <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
        <h4 class=job-request
            [class.announced]='request'>
            {{getRequest()}}
        </h4>
        <button [disabled]="!request">
        I&rsquo;ll take it!
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
            color: red;
            border: 2px solid red;
            padding: 4px;
            background-color: #ffdddd;
        }
        .announced {
           color: red;
           border: 2px solid red;
           background-color: #ffdddd;
        }
      `],
      inputs: ['hero', 'request']
  })
  .Class({
    constructor: function () {
      this.getRequest = function() {
        return this.request
          ? this.request : "No job announced";
      }
    }
  });

var HeroJobBoard = ng
  .Component({
    selector: 'hero-job-board',
    template: `
         <div class='request-panel'>
            <h2>Hero Job Board</h2>
            <div>
                <button (click)='inviteAllHeroes()'>Invite heroes</button>
            </div>
            <h3>Job Request</h3>
            <label>Request:</label>
            <input #box (keyup)='0' style='width: 400px;' [value]='jobRequest' />
            <button (click)='announceJob(box.value)'
              [disabled]='!box?.value.trim().length > 0'>
              Ask
            </button>
            <h3>{{getJobStatus()}}</h3>
            <div class='responding-hero'
                *ng-for='#hero of respondingHeroes'>
                <span class='hero-name'>[hero.name]</span>
                <button>Assign</button>
            </div>
        </div>
        <div class='invited-hero-list'>
            <invited-hero *ng-for='#hero of invitedHeroes'
                [hero]='hero' [request]='jobRequest'>
            </invited-hero>
        </div>
      `,
    styles: [
      `
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
    directives: [ng.NgFor,
      InvitedHero]
  })
  .Class({
    constructor: function () {
      this.heroes = [
        {id: 11, name: "Mr. Nice"},
        {id: 12, name: "Narco"},
        {id: 13, name: "Bombasto"},
        {id: 14, name: "Celeritas"},
        {id: 15, name: "Magneta"},
        {id: 16, name: "RubberMan"},
        {id: 17, name: "Dynama"},
        {id: 18, name: "Dr IQ"},
        {id: 19, name: "Magma"},
        {id: 20, name: "Tornado"}
      ];
      this.invitedHeroes = [];
      this.jobRequest = null;
      
      this.inviteAllHeroes = function() {
        this.invitedHeroes = this.heroes;
        this.respondingHeroes = [];
        this.jobRequest = null;
      }
      
      this.announceJob = function(request) {
        this.jobRequest = request.trim();
      }
      
      this.getJobStatus = function() {
        if (!this.jobRequest) {
          return "No job request announced"
        }
        else {
          return this.respondingHeroes.length > 0
            ? "Responding heroes"
            : "No responding heroes";
        }
      }
    }
  });
  
var HeroJobApp = ng
  .Component({
    selector: 'hero-job-app',
    template: `
      <h1>Hero Job Application</h1>
      <hero-job-board></hero-job-board>
      `,
    styles: [`
      hero-job-board {
          border: 2px dashed lightgray;
          display: block;
      }`],
      directives: [HeroJobBoard]
  })
  .Class({
    constructor: function () { }
  });

document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(HeroJobApp);
});

})();