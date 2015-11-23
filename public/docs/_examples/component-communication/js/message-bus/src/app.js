(function() {
  
var MessageBus = ng
  .Injectable()
  .Class({
    constructor: function() {
      this.broadcastMessage = function(message) {
        console.log(message);
      }
    }
  });
  
var JobService = ng
  .Injectable()
  .Class({
    constructor: function() {
      this._jobRequest = null;
      this._respondingHeroes = [];
      this._assignedTo = null;
      
      this.jobPostEvent = new ng.EventEmitter();
      this.jobAssignedEvent = new ng.EventEmitter();
      
      this.getJobRequest = function() {
        return this._jobRequest;
      }
      
      this.getRespondingHeroes = function() {
        return this._respondingHeroes;
      }
      
      this.getAssignedTo = function() {
        return this._assignedTo;
      }
      
      this.post = function(jobRequest) {
        this._jobRequest = jobRequest;
        this._respondingHeroes = [];
        this.jobPostEvent.next(jobRequest);
      }
    
      this.take = function(hero) {
        this._respondingHeroes.push(hero);
      }
      
      this.assign = function(hero) {
        this._assignedTo = hero;
        this.jobAssignedEvent.next(hero);
      }
    }
  })
  
var InvitedHero = ng
  .Component({
    selector: 'invited-hero',
    template: `
      <div class='invited-hero'>
        <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
        <h4 class=job-request
            [class.announced]='request'
            [class.undertaken]='undertaken'>
            {{getRequest()}}
        </h4>
        <h2 *ng-if='winner'
                [class.won]='undertaken && winner==hero'
                [class.lost]='undertaken && winner!=hero'
                [class.else]='!undertaken'>
                {{getFinalState()}}
            </h2>
            <button [disabled]="!request || undertaken"
                [hidden]='winner'
                (click)='undertakeJob()'>
                I&rsquo;ll take it!
            </button>
            <button [hidden]="!winner || winner == hero"
                (click)='stealJob()'>
                I steal the job!
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
        .undertaken {
            color: blue;
            border: 2px solid blue;
            background-color: #ddddff;
        }
        .won {
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
      inputs: ['hero', 'request'],
      outputs: ['onHeroResponse']
  })
  .Class({
    constructor: [JobService, MessageBus, function (jobService, messageBus) {
      var component = this;
      this.undertaken = false;
      this.onHeroResponse = new ng.EventEmitter();
      this.winner = null;
      
      this.jobService = jobService;
      this.messageBus = messageBus;
      
      this.jobService.jobPostEvent.subscribe(
        function(request){
          component.request = request;
          component.undertaken = false;
        });
        this.jobService.jobAssignedEvent.subscribe(
          function(winner){
            component.winner = winner;
          })
      
      this.getRequest = function() {
        return this.request
          ? this.request : "No job announced";
      }
      
      this.undertakeJob = function() {
        this.jobService.take(this.hero);
        this.undertaken = true;
        this.messageBus.broadcastMessage('*** I, ' + this.hero.name
          + ', proudly undertake the job!')
      }
      
      this.getFinalState = function() {
        if (!this.winner) return "No winner announced yet."
        if (!this.undertaken) return "Job taken."
        return this.winner == this.hero
            ? "I won the job !!!"
            : "I lost the job :-(";
      }
      
      this.stealJob = function () {
        this.undertaken = true;
        this.jobService.assign(this.hero);
        this.messageBus.broadcastMessage('*** I, ' + this.hero.name
            + ', stole the job... Hahaha...');
      }
    }]
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
            <input #box (keyup)='0' style='width: 400px;' [value]='getJobRequest()' />
            <button (click)='announceJob(box.value)'
              [disabled]='!box?.value.trim().length > 0'>
              Ask
            </button>
            <h3>{{getJobStatus()}}</h3>
            <div *ng-if='!getWinner()'>
                <div class='responding-hero'
                    *ng-for='#hero of getRespondingHeroes()'>
                    <span class='hero-name'>{{hero.name}}</span>
                    <button (click)='assignJob(hero)'>Assign</button>
                </div>
            </div>
            <div *ng-if='getWinner()'>
                The winner is 
                <span class='winner'>{{getWinner().name}}
            </div>
        </div>
        <div class='invited-hero-list'>
            <invited-hero *ng-for='#hero of invitedHeroes'
                [hero]='hero' [request]='getJobRequest()'
                (on-hero-response)='heroTakesJob($event)'>
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
        .winner {
            display: inline-block;
            color: white;
            font-weight: bold;
            background-color: green;
            padding: 4px 8px;
        }
        `],
    directives: [ng.NgFor,
      InvitedHero],
    providers: [JobService, MessageBus]
  })
  .Class({
    constructor: [JobService, MessageBus, function (jobService, messageBus) {
      this.jobService = jobService;
      this.messageBus = messageBus;
      this.jobService.post(null);
      
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
      
      this.getJobRequest = function() {
        return this.jobService.getJobRequest();
      };
      
      this.getRespondingHeroes = function() {
        return this.jobService.getRespondingHeroes();
      }
      
      this.inviteAllHeroes = function() {
        this.invitedHeroes = this.heroes;
        this.jobService.post(null);
        this.messageBus.broadcastMessage('Heroes invited.');
      }
      
      this.announceJob = function(request) {
        this.jobService.post(request.trim());
        this.messageBus.broadcastMessage('Job announced: ' + request.trim());
      }
      
      this.getJobStatus = function() {
        if (!this.getJobRequest()) {
            return "No job request announced"
        }
        else if (this.getWinner()) {
            return "Job assigned";
        } else
        {
            return this.jobService.getRespondingHeroes().length > 0
                ? "Responding heroes"
                : "No responding heroes";
        }
    }
      
      this.getWinner = function() {
        return this.jobService.getAssignedTo();
      }
      
      this.assignJob = function(hero) {
        this.jobService.assign(hero);
        this.messageBus.broadcastMessage('Job "' + this.jobRequest 
            + '" assigned to ' + hero.name);
      }
    }]
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