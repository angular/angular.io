(function(app) {
  if (!app.sampleRoots) app.sampleRoots = {};
  
  var HeroPanel = 
    ng.core.Component({
      selector: 'hero-panel',
      template: `
        <div class='hero-panel'>
          <h3>{{hero.name}}</h3>
          <h4 class=job-request
            [class.announced]="request"
            [class.undertaken]="undertaken">
            {{request || 'No job announced'}}
          </h4>
          <button
            [disabled]="!request || undertaken"
            [hidden]="winner"
            (click)="takeJob()">
              I'll take it!
          </button>
        </div>
      `,
      inputs: ['hero', 'request'],
      outputs: ['onJobTaken']
  })
  .Class({
    constructor: function() {
      this.onJobTaken = new ng.core.EventEmitter();
      this.undertaken = false;
      this.takeJob = function() {
        this.onJobTaken.emit(this.hero);
        this.undertaken = true;
      }
    }
  });
  
  var HeroJobBoard = 
    ng.core.Component({
      selector: 'hero-job-board',
      templateUrl: 'app/take-job-event/job-board-template.html',
      directives: [HeroPanel]
    })
    .Class({
      constructor: function() {
        this.invitedHeroes = [];
        this.respondingHeroes = [];
        this.request = null;
        this.newRequest = null;

        this.inviteHeroes = function() {
          this.invitedHeroes = app.Heroes;
          this.respondingHeroes = [];
          this.request = null;
          this.newRequest = null;
        }
  
        this.announceJob = function() {
          this.request = this.newRequest;
        }
        
        this.heroTakesJob = function(hero) {
          this.respondingHeroes.push(hero);
        }
        this.getJobStatus = function() {
          if (!this.request) { return "No job request announced" }
          return this.respondingHeroes.length > 0
            ? "Responding heroes"
            : "No responding heroes";
        }
      }
    })

  app.sampleRoots.TakeJobEvent = HeroJobBoard;
})(window.app || (window.app = {}));