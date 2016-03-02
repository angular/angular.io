(function(app) {
  if (!app.scenarioRoots) app.scenarioRoots = {};
  
  var JobService = 
    ng.core.Injectable()
    .Class({
      constructor: function() {
        var _invitedHeroes = [];
        var _request = null;
        var _respondingHeroes = [];
        var _winner = null;
        var _jobAnnounced = new ng.core.EventEmitter();
        var _jobAssigned = new ng.core.EventEmitter();
        
        // HeroJobBoard facade
        this.getInvitedHeroes = function() {
          return _invitedHeroes;
        }
        
        this.getRespondingHeroes = function() {
          return _respondingHeroes;
        }
        
        this.inviteHeroes = function() {
          _invitedHeroes = app.Heroes;
          _respondingHeroes = [];
          this.announceJob(null);
        }
        
        this.announceJob = function(request) {
          _request = request;
          _jobAnnounced.emit(request);
        }
        
        this.assignJob = function (hero) {
          _winner = hero;
          _jobAssigned.emit(hero);
        }
        
        this.getWinner = function() {
          return _winner;
        }
  
        // HeroPanel facade
        this.getRequest = function () {
          return this._request;
        }
  
        this.getJobAnnounced = function() {
          return _jobAnnounced
        }
  
        this.takeJob = function(hero) {
          _respondingHeroes.push(hero);
        }
  
        this.getJobAssigned = function() {
          return _jobAssigned;
        }
      }
    })
  
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
          <h3 *ngIf="getWinner()"
            [class.won] ="undertaken && getWinner()==hero"
            [class.lost]="undertaken && getWinner()!=hero"
            [class.else]="!undertaken">
            {{getFinalState()}}
          </h3>
          <button
            [disabled]="!request || undertaken"
            [hidden]="getWinner()"
            (click)="takeJob()">
            I'll take it!
          </button>
        </div>
      `,
      inputs: ['hero', 'request']
  })
  .Class({
    constructor: [JobService, function(jobService) {
      var component = this;
      this.undertaken = false;
  
      this.takeJob = function() {
        jobService.takeJob(this.hero);
        this.undertaken = true;
      }
     
      this.getWinner = function() {
        return jobService.getWinner();
      }
    
      this.getFinalState = function() {
        return jobService.getWinner() == this.hero ?
          "I won the job !!!" :
          (this.undertaken ? "I lost the job :-(" : "Job taken.");
      }
 
      jobService.getJobAnnounced().subscribe(
        function(job) {
          component.request = job;
        });
    }]
  });
  
  var HeroJobBoard = 
    ng.core.Component({
      selector: 'hero-job-board',
      templateUrl: 'app/assign-job/job-board-template.html',
      directives: [HeroPanel],
      providers: [JobService]
    })
    .Class({
      constructor: [JobService, function(jobService) {
        this.newRequest = null;
        
        this.getInvitedHeroes = function() {
          return jobService.getInvitedHeroes();
        }

        this.getRespondingHeroes = function() {
          return jobService.getRespondingHeroes();
        }

        this.getWinner = function() {
          return jobService.getWinner();
        }

        this.inviteHeroes = function() {
          jobService.inviteHeroes();
          this.newRequest = null;
        }
  
        this.announceJob = function() {
          jobService.announceJob(this.newRequest);
        }
        
        this.assignJob = function(hero) {
          jobService.assignJob(hero);
        }

        this.getJobStatus = function() {
          if (!jobService.request) { return "No job request announced" }
          if (jobService.getWinner()) { return "Job assigned"; }
          return jobService.getRespondingHeroes().length
            ? "Responding heroes"
            : "No responding heroes";
        }
      }]
    })

  app.scenarioRoots.AssignJob = HeroJobBoard;
})(window.app || (window.app = {}));