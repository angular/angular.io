(function(app) {
  if (!app.scenarioRoots) app.scenarioRoots = {};
  
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
      constructor: function() {}
  });
  
  
  HeroPanel.prototype.ngOnChanges = function(changes) {
    for (var propName in changes) {
      var changedProp = changes[propName];
      var fromValue = JSON.stringify(changedProp.previousValue);
      var toValue = JSON.stringify(changedProp.currentValue);
      console.log(propName + ' changed from ' + fromValue + ' to ' + toValue);
    }
  }
  
  Object.defineProperty(HeroPanel.prototype, 'request', {
    get: function () {
      return this._request;
    },
    set: function (newJob) {
      console.log('New job request: ' + newJob + ' (' + new Date().toLocaleTimeString() + ')');
      if (newJob && newJob.indexOf('$') >= 0) {
         this.request = "*** " + newJob.replace('$', '');
      } else {
        this._request = newJob;
      }
    },
    enumerable: true,
    configurable: true
  });
  
  var HeroJobBoard = 
    ng.core.Component({
      selector: 'hero-job-board',
      templateUrl: 'app/log-job-request/job-board-template.html',
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
    
  app.scenarioRoots.LogJobRequest = HeroJobBoard;
})(window.app || (window.app = {}));