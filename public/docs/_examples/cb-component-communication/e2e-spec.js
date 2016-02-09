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
      var parent = element.all(by.tagName('hero-parent')).get(0);
      var heroes = parent.all(by.tagName('hero-child'));

      for (var i = 0; i < _heroNames.length; i++) {
        var childTitle = heroes.get(i).element(by.tagName('h3')).getText();
        var childDetail = heroes.get(i).element(by.tagName('p')).getText();
        expect(childTitle).toEqual(_heroNames[i] + ' says:')
        expect(childDetail).toContain(_masterName)
      }
    });
    // ...
    // #enddocregion parent-to-child
  });

  describe('Parent-to-child communication with setter', function() {
    // #docregion parent-to-child-setter
    // ...
    it('should display trimmed, non-empty names', function () {
      var _nonEmptyNameIndex = 0;
      var _nonEmptyName = '"Mr. IQ"';
      var parent = element.all(by.tagName('name-parent')).get(0);
      var hero = parent.all(by.tagName('name-child')).get(_nonEmptyNameIndex);

      var displayName = hero.element(by.tagName('h3')).getText();
      expect(displayName).toEqual(_nonEmptyName)
    });

    it('should replace empty name with default name', function () {
      var _emptyNameIndex = 1;
      var _defaultName = '"<no name set>"';
      var parent = element.all(by.tagName('name-parent')).get(0);
      var hero = parent.all(by.tagName('name-child')).get(_emptyNameIndex);

      var displayName = hero.element(by.tagName('h3')).getText();
      expect(displayName).toEqual(_defaultName)
    });
    // ...
    // #enddocregion parent-to-child-setter
  });

  describe('Parent-to-child communication with ngOnChanges', function() {
    // #docregion parent-to-child-onchanges
    // ...
    // Test must all execute in this exact order
    it('should set expected initial values', function () {
      var actual = getActual();

      var initialLabel = "Version 1.23";
      var initialLog = 'major changed from {} to 1, minor changed from {} to 23';

      expect(actual.label).toBe(initialLabel);
      expect(actual.count).toBe(1);
      expect(actual.logs.get(0).getText()).toBe(initialLog);
    });

    it('should set expected values after clicking "Minor" twice', function () {
      var repoTag = element(by.tagName('version-parent'));
      var newMinorButton = repoTag.all(by.tagName('button')).get(0);

      newMinorButton.click().then(function() {
        newMinorButton.click().then(function() {
          var actual = getActual();

          var labelAfter2Minor = "Version 1.25";
          var logAfter2Minor = 'minor changed from 24 to 25';

          expect(actual.label).toBe(labelAfter2Minor);
          expect(actual.count).toBe(3);
          expect(actual.logs.get(2).getText()).toBe(logAfter2Minor);
        })
      });
    });

    it('should set expected values after clicking "Major" once', function () {
      var repoTag = element(by.tagName('version-parent'));
      var newMajorButton = repoTag.all(by.tagName('button')).get(1);

      newMajorButton.click().then(function() {
        var actual = getActual();

        var labelAfterMajor = "Version 2.0";
        var logAfterMajor = 'major changed from 1 to 2, minor changed from 25 to 0';

        expect(actual.label).toBe(labelAfterMajor);
        expect(actual.count).toBe(4);
        expect(actual.logs.get(3).getText()).toBe(logAfterMajor);
      });
    });

    function getActual() {
      var versionTag = element(by.tagName('version-child'));
      var label = versionTag.element(by.tagName('h3')).getText();
      var ul = versionTag.element((by.tagName('ul')));
      var logs = ul.all(by.tagName('li'));

      return {
        label: label,
        logs: logs,
        count: logs.count()
      };
    }
    // ...
    // #enddocregion parent-to-child-onchanges

  });

  describe('Child-to-parent communication', function() {
    // #docregion child-to-parent
    // ...
    it('should not emit the event initially', function () {
      var voteLabel = element(by.tagName('vote-taker'))
        .element(by.tagName('h3')).getText();
      expect(voteLabel).toBe("Agree: 0, Disagree: 0");
    });

    it('should process Agree vote', function () {
      var agreeButton1 = element.all(by.tagName('my-voter')).get(0)
        .all(by.tagName('button')).get(0);
      agreeButton1.click().then(function() {
        var voteLabel = element(by.tagName('vote-taker'))
          .element(by.tagName('h3')).getText();
        expect(voteLabel).toBe("Agree: 1, Disagree: 0");
      });
    });

    it('should process Disagree vote', function () {
      var agreeButton1 = element.all(by.tagName('my-voter')).get(1)
        .all(by.tagName('button')).get(1);
      agreeButton1.click().then(function() {
        var voteLabel = element(by.tagName('vote-taker'))
          .element(by.tagName('h3')).getText();
        expect(voteLabel).toBe("Agree: 1, Disagree: 1");
      });
    });
    // ...
    // #enddocregion child-to-parent
  });

  describe('Parent calls ViewChild', function() {
    // #docregion parent-to-view-child
    // ...
    it('should stop the countdown', function () {
      var stopButton = element
        .all(by.tagName('countdown-parent')).get(0)
        .all(by.tagName('button')).get(1);

      stopButton.click().then(function() {
        var message = element(by.tagName('countdown-timer'))
                     .element(by.tagName('p')).getText();
        expect(message).toContain('Holding');
      });
    });
    // ...
    // #enddocregion parent-to-view-child
  });

  describe('Parent and children communicate via a service', function() {
    // #docregion bidirectional-service
    // ...
    it('should announce a mission', function () {
      var missionControl = element(by.tagName('mission-control'));
      var announceButton = missionControl.all(by.tagName('button')).get(0);
      announceButton.click().then(function () {
        var history = missionControl.all(by.tagName('li'));
        expect(history.count()).toBe(1);
        expect(history.get(0).getText()).toBe('Mission announced');
      });
    });

    it('should confirm the mission by Lovell', function () {
      testConfirmMission(1, 2, 'Lovell');
    });

    it('should confirm the mission by Haise', function () {
      testConfirmMission(3, 3, 'Haise');
    });

    it('should confirm the mission by Swigert', function () {
      testConfirmMission(2, 4, 'Swigert');
    });

    function testConfirmMission(buttonIndex, expectedLogCount, astronaut) {
      var _confirmedLog = ' confirmed the mission';
      var missionControl = element(by.tagName('mission-control'));
      var confirmButton = missionControl.all(by.tagName('button')).get(buttonIndex);
      confirmButton.click().then(function () {
        var history = missionControl.all(by.tagName('li'));
        expect(history.count()).toBe(expectedLogCount);
        expect(history.get(expectedLogCount-1).getText()).toBe(astronaut + _confirmedLog);
      });
    }
    // ...
    // #enddocregion bidirectional-service
  });

  describe('Communication between unrelated components', function() {
    // #docregion unrelated-components
    // ...
    it('should send a message to MessageBoard', function() {
      testMessageSent([24.5]);
    });
    
    it('should send another message to MessageBoard', function() {
      testMessageSent([24.5, 32.8]);
    });
    // ...
    
    function testMessageSent(tempData) {
      var sendDataButton = element(by.tagName('telemetry'))
        .element(by.tagName('button'));
      var messages = element(by.tagName('message-board'))
        .all(by.tagName('li'));
      sendDataButton.click().then(function() {
        expect(messages.count()).toBe(tempData.length);
        for (var i = 0; i < tempData.length; i++) {
          expect(messages.get(i).getText()).toBe('Temperature: ' + tempData[i]);
        }
      })
    }
    // #enddocregion unrelated-components
  });
});
