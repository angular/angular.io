(function(app) {
  if (!app.sampleRoots) app.sampleRoots = {};
  
  var HeroPanel = 
    ng.core.Component({
      selector: 'hero-panel',
      template: `
        <div class='hero-panel'>
          <h3>{{hero.name}}</h3>
          <h4 class=job-request
            [class.announced]="request">
            {{request || 'No job announced'}}
          </h4>
        </div>
      `,
      inputs: ['hero', 'request']
  })
  .Class({
      constructor: function() { }
  });
  
  var HeroJobBoard = 
    ng.core.Component({
      selector: 'hero-job-board',
      templateUrl: 'app/send-job-request/job-board-template.html',
      directives: [HeroPanel]
    })
    .Class({
      constructor: function() {
        this.invitedHeroes = [];
        this.request = null;
        this.newRequest = null;

        this.inviteHeroes = function() {
          this.invitedHeroes = app.Heroes;
          this.request = null;
          this.newRequest = null;
        }
  
        this.announceJob = function() {
          this.request = this.newRequest;
        }
      }
    })
    
  app.sampleRoots.SendJobRequest = HeroJobBoard;
})(window.app || (window.app = {}));