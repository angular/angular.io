describe('Component Communication Cookbook Tests', function () {


  beforeAll(function () {
    browser.get('');
  });

  describe('Parent-to-child communication', function() {
    // #docregion parent-to-child
    // ...
    var _heroNames = ['Mr. IQ', 'Magneta', 'Bombasto'];
    var _masterName = 'Master';

    it('should pass properties to children properly', function () {
      var master = element.all(by.tagName('master')).get(0);
      var heroes = master.all(by.tagName('hero'));

      for (var i = 0; i < _heroNames.length; i++) {
        var childTitle = heroes.get(i).element(by.tagName('h3')).getText();
        var childDetail = heroes.get(i).element(by.tagName('p')).getText();
        expect(childTitle).toEqual(_heroNames[i] + ' says:')
        expect(childDetail).toContain(_masterName + '.')
      }
    });
    // ...
    // #enddocregion parent-to-child
  });
  
  describe('Parent-to-child communication with validation', function() {
    // #docregion parent-to-child-setter
    // ...
    var _properHeroIndex = 0;
    var _properHeroName = 'Mr. IQ';
    var _invalidHeroIndex = 1;
    var _invalidHeroName = '<no name set>';

    it('should display properly set hero name', function () {
      var master = element.all(by.tagName('master2')).get(0);
      var hero = master.all(by.tagName('hero')).get(_properHeroIndex);

      var childTitle = hero.element(by.tagName('h3')).getText();
      expect(childTitle).toEqual(_properHeroName)
    });

    it('should not allow to set invalid hero name', function () {
      var master = element.all(by.tagName('master2')).get(0);
      var hero = master.all(by.tagName('hero')).get(_invalidHeroIndex);

      var childTitle = hero.element(by.tagName('h3')).getText();
      expect(childTitle).toEqual(_invalidHeroName)
    });
    // ...
    // #enddocregion parent-to-child-setter
  });
  
  describe('Parent-to-child communication with onChanges', function() {
    // #docregion parent-to-child-onchanges
    // ...
    var _initialLabel = "Version 1.23";
    var _initialLog = 'major changed from {} to 1, minor changed from {} to 23';
    var _labelAfter2Minor = "Version 1.25";
    var _logCountAfter2Minor = 3;
    var _logAfter2Minor = 'minor changed from 24 to 25';
    var _labelAfterMajor = "Version 2.0";
    var _logCountAfterMajor = 4;
    var _logAfterMajor = 'major changed from 1 to 2, minor changed from 25 to 0';

    it('should set initial values properly', function () {
      var versionTag = element(by.tagName('version'));
      var versionLabel = versionTag.element(by.tagName('h2')).getText();
      var logItems = versionTag.element(by.tagName('ul')).all(by.tagName('li'));

      expect(versionLabel).toBe(_initialLabel);
      expect(logItems.count()).toBe(1);
      expect(logItems.get(0).getText()).toBe(_initialLog);
    });

    it('should set version values properly after clicking New minor version twice', function () {
      var repoTag = element(by.tagName('repository'));
      var newMinorButton = repoTag.all(by.tagName('button')).get(0);
      newMinorButton.click(function() {
        newMinorButton.click(function() {
          var versionTag = element(by.tagName('version'));
          var versionLabel = versionTag.element(by.tagName('h2')).getText();
          var logItems = versionTag.element(by.tagName('ul')).all(by.tagName('li'));
          expect(versionLabel).toBe(_labelAfter2Minor);
          expect(logItems.count()).toBe(_logCountAfter2Minor);
          expect(logItems.get(_logCountAfter2Minor - 1).getText()).toBe(_logAfter2Minor);
        });
      });
    });

    it('should set version values properly after clicking New major version', function () {
      var repoTag = element(by.tagName('repository'));
      var newMajorButton = repoTag.all(by.tagName('button')).get(1);
      newMajorButton.click(function() {
        var versionTag = element.all(by.tagName('version')).get(0);
        var versionLabel = versionTag.element(by.tagName('h2')).getText();
        var logItems = versionTag.element(by.tagName('ul')).all(by.tagName('li'));
        expect(versionLabel).toBe(_labelAfterMajor);
        expect(logItems.count()).toBe(_logCountAfterMajor);
        expect(logItems.get(_logCountAfterMajor - 1).getText()).toBe(_logAfterMajor);
      });
    });
    // ...
    // #enddocregion parent-to-child-onchanges
      
  });
  
  describe('Child-to-parent communication', function() {
    // #docregion child-to-parent
    // ...
    var _initialVotes = "Agree: 0, Disagree: 0";
    var _votesAfterAgree = "Agree: 1, Disagree: 0";
    var _votesAfterAgreeAndDisagree = "Agree: 1, Disagree: 1";

    it('should not emit the event initially', function () {
      var voteLabel = element(by.tagName('vote-taker'))
        .element(by.tagName('h2')).getText();
      expect(voteLabel).toBe(_initialVotes);
    });

    it('should process Agree vote', function () {
      var agreeButton1 = element.all(by.tagName('seat')).get(0)
        .all(by.tagName('button')).get(0);
      agreeButton1.click(function() {
        var voteLabel = element(by.tagName('vote-taker'))
          .element(by.tagName('h2')).getText();
        expect(voteLabel).toBe(_votesAfterAgree);
      });
    });

    it('should process Disagree vote', function () {
      var agreeButton1 = element.all(by.tagName('seat')).get(1)
        .all(by.tagName('button')).get(1);
      agreeButton1.click(function() {
        var voteLabel = element(by.tagName('vote-taker'))
          .element(by.tagName('h2')).getText();
        expect(voteLabel).toBe(_votesAfterAgreeAndDisagree);
      });
    });
    // ...
    // #enddocregion child-to-parent
  });
  
  describe('Bidirectional communication with a service', function() {
    // #docregion bidirectional-service
    // ...
    var _announcedLog = 'Mission announced';
    var _confirmedLog = ' confirmed the mission';
    
    it('should announce a mission', function () {
      var missionControl = element(by.tagName('mission-control'));
      var announceButton = missionControl.all(by.tagName('button')).get(0);
      announceButton.click(function () {
        var history = missionControl.all(by.tagName('li'));
        expect(history.count()).toBe(1);
        expect(history.get(0).getText()).toBe(_announcedLog);
      });
    });

    it('should be able to confirm the mission by Lovell', function () {
      testConfirmMission(1, 2, 'Lovell');
    });
    
    it('should be able to confirm the mission by Haise', function () {
      testConfirmMission(3, 3, 'Haise');
    });

    it('should be able to confirm the mission by Lovell', function () {
      testConfirmMission(2, 4, 'Swigert');
    });
    
    function testConfirmMission(buttonIndex, expectedLogCount, astronaut) {
      var missionControl = element(by.tagName('mission-control'));
      var confirmButton = missionControl.all(by.tagName('button')).get(buttonIndex);
      confirmButton.click(function () {
        var history = missionControl.all(by.tagName('li'));
        expect(history.count()).toBe(expectedLogCount);
        expect(history.get(0).getText()).toBe(astronaut + _confirmedLog);
      });
    }
    // ...
    // #enddocregion bidirectional-service
  });
  
  describe('Communication between unrelated components', function() {
    // #docregion unrelated-components
    // ...
    it('should process "Get temperature"', function () {
      testAction(0, 0, 0, 1);
    });
    
    it('should process "Get speed"', function () {
      testAction(1, 1, 0, 2);
    });

    it('should process "Get acceleration"', function () {
      testAction(2, 1, 1, 3);
    });

    it('should process "Increase speed"', function () {
      testAction(3, 2, 1, 4);
    });

    it('should process "Get inclination"', function () {
      testAction(4, 2, 1, 5);
    });

    it('should process "Check acceleration"', function () {
      testAction(5, 2, 2, 6);
    });

    function testAction(buttonIndex, telemetryCount, trajectoryCount, messageCenterCount) {
      var commandCenter = element(by.tagName('command-center'));
      var actionButton = commandCenter.all(by.tagName('button')).get(buttonIndex);
      actionButton.click(function () {
        var missionGroups = commandCenter.all(by.tagName('mission-group'));
        var telemetryLog = missionGroups.get(0).all(by.tagName('li'));
        var trajectoryLog = missionGroups.get(1).all(by.tagName('li'));
        var messageCenterLog = missionGroups.get(1).all(by.tagName('li'));
        expect(telemetryLog.count()).toBe(telemetryCount);
        expect(trajectoryLog.count()).toBe(trajectoryCount);
        expect(messageCenterLog.count()).toBe(messageCenterCount);
      });
    }
    // ...
    // #enddocregion unrelated-components
  });
  
  describe('Communication between unrelated components', function() {
    // #docregion contentchildren
    // ...
    var _predefinedItems = 2;
    var _newItems = 15;
    
    it('should generate the next 15 sequence items', function () {
      var fiboComp = element(by.tagName('sequence'));
      var generateButton = fiboComp.all(by.tagName('button')).get(0);
      generateNextItem(_newItems);
      
      function generateNextItem(count) {
        console.log(count);
        if (count <= 0) return;
        generateButton.click(function() {
          var items = fiboComp.all(by.tagName('li'));
          expect(items.count()).toBe(count + _predefinedItems);
          generateNextItem(count - 1);
        })
      }
    })

    it('should display the last 5 items only', function () {
      var fiboComp = element(by.tagName('sequence'));
      var last5Button = fiboComp.all(by.tagName('button')).get(2);
      last5Button.click(function() {
        var items = fiboComp.all(by.tagName('li'));
        expect(items.count()).toBe(5);
      })
    })
    
    it('should display all items', function () {
      var fiboComp = element(by.tagName('sequence'));
      var showAllButton = fiboComp.all(by.tagName('button')).get(1);
      showAllButton.click(function() {
        var items = fiboComp.all(by.tagName('li'));
        expect(items.count()).toBe(_predefinedItems +_newItems);
      })
    })
    // ...
    // #enddocregion contentchildren
  });

});
