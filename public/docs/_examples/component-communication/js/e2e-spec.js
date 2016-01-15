describe('Component Communication', function () {

  var _title = 'Component Communication';
  var _invitePath = '/invite-heroes';
  var _inviteTitle = 'Invite';
  var _sendRequestPath = '/send-job-request';
  var _sendRequestTitle = 'Send Job Request';
  var _logRequestPath = '/log-job-request';
  var _logRequestTitle = 'Log Job Request';
  var _takeJobPath = '/take-job-event';
  var _takeJobTitle = 'Take Job';
  var _assignJobPath = '/assign-job';
  var _assignJobTitle = 'Assign Job';

  var _activeLinkClass = 'router-link-active';
  var _panelListCss = 'hero-panel-list';
  var _respondingCss = 'responding-hero';
  var _allHeroesCount = 6;
  var _noJobText = 'No job announced';
  var _newJobText = 'Destroy aliens!';
  var _urgentJobAnnounced = 'Urgent$ help!';
  var _urgentJobReceived = '*** Urgent help!';
  var _respondingHeros = [0, 2, 3];
  var _winnerIndex = 1;
  
  beforeAll(function () {
    browser.get('');
  });

  it('should display correct title: ' + _title, function () {
    expect(element(by.css('h1')).getText()).toEqual(_title);
  });

  // ==========================================================================
  // --- "Invite" sample test cases
  // ==========================================================================
  describe(_inviteTitle + ' sample', function() {
    it('should be able to navigate to the ' + _inviteTitle + ' link', function () {
      linkCanbeVisited(_invitePath, _inviteTitle);
    });
    
    it('should have no heroes invited initially', function(){
      initiallyNoHeroesAreInvited();
    });
    
    it('should be able to invite all heroes', function() {
      inviteHeroesButtonWorksAsExpected();
    });
  });
  
  // ==========================================================================
  // --- "Send Job Request" sample test cases
  // ==========================================================================
  describe(_sendRequestTitle + ' sample', function() {
    it('should be able to navigate to the ' + _sendRequestTitle + ' link', function () {
      linkCanbeVisited(_sendRequestPath, _sendRequestTitle);
    });

    it('should have no heroes invited initially', function(){
      initiallyNoHeroesAreInvited();
    });
    
    it('should be able to invite all heroes', function() {
      inviteHeroesButtonWorksAsExpected();
    });
    
    it('should have no job request sent initially', function() {
      initiallyNoJobIsAnnounced();
    });
    
    it('should be able to announce a new job', function() {
      heroesReceiveAnnouncedJob(_newJobText);
    });
  });

  // ==========================================================================
  // --- "Log Job Request" sample test cases
  // ==========================================================================
  describe(_logRequestTitle + ' sample', function() {
    it('should be able to navigate to the ' + _logRequestTitle + ' link', function () {
      linkCanbeVisited(_logRequestPath, _logRequestTitle);
    });

    it('should have no heroes invited initially', function(){
      initiallyNoHeroesAreInvited();
    });
    
    it('should be able to invite all heroes', function() {
      inviteHeroesButtonWorksAsExpected();
    });
    
    it('should have no job request sent initially', function() {
      initiallyNoJobIsAnnounced();
    });
    
    it('should be able to announce an urgent job', function() {
      heroesReceiveAnnouncedJob(_urgentJobAnnounced, _urgentJobReceived);
    });
  });

  // ==========================================================================
  // --- "Take Job" sample test cases
  // ==========================================================================
  describe(_takeJobTitle + ' sample', function() {
    it('should be able to navigate to the ' + _takeJobTitle + ' link', function () {
      linkCanbeVisited(_takeJobPath, _takeJobTitle);
    });

    it('should have no heroes invited initially', function(){
      initiallyNoHeroesAreInvited();
    });
    
    it('should be able to invite all heroes', function() {
      inviteHeroesButtonWorksAsExpected();
    });
    
    it('should have no job request sent initially', function() {
      initiallyNoJobIsAnnounced();
    });
    
    it('should be able to announce a new job', function() {
      heroesReceiveAnnouncedJob(_newJobText);
    });
    
    it('should have no responding heroes', function () {
      forEachHeroPanel(function (index, heroPanel) {
        var request = heroPanel.element(by.tagName('h4'));
        expect(request).toBeDefined('should be able to find hero panel');
        expect(request.getAttribute('class')).not.toContain('undertaken');
      });
    });
    
    it('should be able to undertake a job', function() {
      forEachHeroPanel(function(index, heroPanel){
        heroCanUndertakeJob(index, heroPanel);
      });
    });
  });

  // ==========================================================================
  // --- "Assign Job" sample test cases
  // ==========================================================================
  describe(_assignJobTitle + ' sample', function() {
    it('should be able to navigate to the ' + _assignJobTitle + ' link', function () {
      linkCanbeVisited(_assignJobPath, _assignJobTitle);
    });

    it('should have no heroes invited initially', function(){
      initiallyNoHeroesAreInvited();
    });
    
    it('should be able to invite all heroes', function() {
      inviteHeroesButtonWorksAsExpected();
    });
    
    it('should have no job request sent initially', function() {
      initiallyNoJobIsAnnounced();
    });
    
    it('should be able to announce a new job', function() {
      heroesReceiveAnnouncedJob(_newJobText);
    });
    
    it('should have no responding heroes', function () {
      forEachHeroPanel(function (index, heroPanel) {
        var request = heroPanel.element(by.tagName('h4'));
        expect(request).toBeDefined('should be able to find hero panel');
        expect(request.getAttribute('class')).not.toContain('undertaken');
      });
    });

    it('should be able to undertake a job', function() {
      var respondingPanels = [];
      forEachHeroPanel(function (index, panel) {
        if (_respondingHeros.indexOf(index) >= 0) {
          respondingPanels.push(panel);
        }
      });
      for (var i = 0; i < respondingPanels.length; i++) {
        (function(index){
          var heroPanel = respondingPanels[i];
          var undertakeBtn = heroPanel.element(by.css('button'));
          undertakeBtn.click().then(function() {
            var request = heroPanel.element(by.tagName('h4'));
            expect(request.getAttribute('class')).toContain('undertaken');
        });
        })(i)
      }
    });
    
    it('should be able to announce winner', function() {
      var winnerHero = element.all(by.className(_respondingCss)).get(_winnerIndex);
      expect(winnerHero).toBeDefined('should announce winner');
      var assignBtn = winnerHero.element(by.tagName('button'));
      expect(assignBtn).toBeDefined('winner should have an assign button');
      expect(assignBtn.isEnabled()).toBe(true, 'winner should have an enabled assign button');
      assignBtn.click().then(function() {
        var winnerDetected = false;
        var nonRespondingCount = 0;
        var respondingCount = 0;
        forEachHeroPanel(function (index, heroPanel) {
          var resultPanel = heroPanel.all(by.tagName('h3')).get(1);
          if (index == _respondingHeros[_winnerIndex]) {
            expect(resultPanel.getAttribute('class')).toContain('won', 'should be the winner hero');
            winnerDetected = true;
          } else if (_respondingHeros.indexOf(index) < 0) {
            expect(resultPanel.getAttribute('class')).toContain('else', 'should be a non-responding hero');
            nonRespondingCount++;
          } else {
            expect(resultPanel.getAttribute('class')).toContain('lost', 'should lost the job');
            respondingCount++;
          }
        });
        expect(winnerDetected).toBe(true, 'A winner has been found');
        expect(respondingCount).toBe(_respondingHeros.length - 1, 'All responding heroes are checked');
        expect(nonRespondingCount).toBe(_allHeroesCount - _respondingHeros.length, 'All nonresponding heroes are checked');
      });
    });
  });
  
  // ----------------------------------------------------------------------------
  // --- Test segment functions
  // ----------------------------------------------------------------------------
  function linkCanbeVisited(path, linkName) {
    var link = element(by.css('a[href="' + path + '"]'));
    expect(link).toBeDefined('should be able to find link "' + linkName + '"');
    
    link.click().then(function() {
    expect(link.getAttribute('class')).toBe(_activeLinkClass, 'should be active link: ' + linkName);
    })
  }
  
  function initiallyNoHeroesAreInvited() {
    var heroPanelList = element(by.className(_panelListCss));
    expect(heroPanelList).toBeDefined();
    var heroPanels = heroPanelList.all(by.tagName('hero-panel'));
    expect(heroPanels.count()).toBe(0, 'No heroes should be invited');
  }
  
  function inviteHeroesButtonWorksAsExpected() {
    var inviteBtn = element(by.cssContainingText('button', 'Invite heroes'));
    expect(inviteBtn).toBeDefined('should be able to find Invite heroes button');
    inviteBtn.click().then(function() {
      var heroPanelList = element(by.className(_panelListCss));
      expect(heroPanelList).toBeDefined();
      var heroPanels = heroPanelList.all(by.tagName('hero-panel'));
      expect(heroPanels.count()).toBe(_allHeroesCount, 'All heroes should be invited');
    });
  }
  
  function initiallyNoJobIsAnnounced() {
    forEachHeroPanel(function (index, heroPanel) {
      var request = heroPanel.element(by.tagName('h4'));
      expect(request).toBeDefined('should be able to find hero panel');
      expect(request.getText()).toBe(_noJobText, 'should have no job announced');
      expect(request.getAttribute('class')).toContain('job-request');
      expect(request.getAttribute('class')).not.toContain('announced', 'should not be announced');
    });
  }
  
  function heroesReceiveAnnouncedJob(jobAnnounced, jobReceived) {
    if (!jobReceived) {
      jobReceived = jobAnnounced;
    }
    var jobInput = element(by.tagName('input'));
    expect(jobInput).toBeDefined('should be able to find job request input');
    sendKeys(jobInput, jobAnnounced);
    var askBtn = element(by.cssContainingText('button', 'Ask'));
    expect(askBtn).toBeDefined('should be able to find Ask button');
    askBtn.click().then(function() {
      forEachHeroPanel(function (index, heroPanel){
        var request = heroPanel.element(by.tagName('h4'));
        expect(request).toBeDefined('should be able to find hero panel');
        expect(request.getText()).toBe(jobReceived, 'should contain the announced job');
        expect(request.getAttribute('class')).toContain('job-request');
        expect(request.getAttribute('class')).toContain('announced', 'should not be announced');
      });
    });
  }
  
  function heroCanUndertakeJob(panelIndex, heroPanel) {
    var heroName = heroPanel.element(by.tagName('h3')).getText();
    var undertakeBtn = heroPanel.element(by.css('button'));
    expect(undertakeBtn).toBeDefined('should contain undertake button');
    expect(undertakeBtn.isEnabled()).toBe(true,'should enable undertake button');
    undertakeBtn.click().then(function() {
      var request = heroPanel.element(by.tagName('h4'));
      expect(undertakeBtn.isEnabled()).toBe(false,'should disable undertake button'); 
      expect(request).toBeDefined('should be able to find hero panel');
      expect(request.getAttribute('class')).toContain('undertaken');
      var respondingHero = element.all(by.className(_respondingCss)).get(panelIndex);
      expect(respondingHero).toBeDefined('should have responding heroes section')
      var respondingName = respondingHero.element(by.tagName('span'));
      expect(respondingName.getText()).toBe(heroName, 'should name the responding hero');
    });
  }
  
  // ----------------------------------------------------------------------------
  // --- Test helper functions
  // ----------------------------------------------------------------------------
  function forEachHeroPanel(action) {
    var heroPanelList = element(by.className(_panelListCss));
    expect(heroPanelList).toBeDefined();
    var heroPanels = heroPanelList.all(by.tagName('hero-panel'));
    expect(heroPanels.count()).toBe(_allHeroesCount, 'All heroes should be invited');
    for (var i = 0; i < _allHeroesCount; i++) {
      var heroPanel = heroPanels.get(i);
      action(i, heroPanel);
    }
  }
});
