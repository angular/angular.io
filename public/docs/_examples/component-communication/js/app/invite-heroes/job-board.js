(function(app) {
  if (!app.scenarioRoots) app.scenarioRoots = {};
  
  var HeroPanel = 
    ng.core.Component({
      selector: 'hero-panel',
      template: `
        <div class='hero-panel'>
          <h3>{{hero.name}}</h3>
        </div>
      `,
      inputs: ['hero']
  })
  .Class({
      constructor: function() {}
  });
  
  var HeroJobBoard = 
    ng.core.Component({
      selector: 'hero-job-board',
      templateUrl: 'app/invite-heroes/job-board-template.html',
      directives: [HeroPanel]
    })
    .Class({
      constructor: function() {
        this.invitedHeroes = [];

        this.inviteHeroes = function() {
          this.invitedHeroes = app.Heroes;
        }
      }
    })
    
  app.scenarioRoots.InviteHero = HeroJobBoard;
})(window.app || (window.app = {}));