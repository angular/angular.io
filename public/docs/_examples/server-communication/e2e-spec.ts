describe('Server Communication', function () {

  beforeAll(function () {
    browser.get('');
  });

  describe('Tour of Heroes (Observable)', function () {

    var initialHeroCount = 4;
    var newHeroName = 'Mr. IQ';
    var heroCountAfterAdd = 5;

    var heroListComp = element(by.tagName('hero-list'));
    var addButton = heroListComp.element(by.tagName('button'));
    var heroTags = heroListComp.all(by.tagName('li'));
    var heroNameInput = heroListComp.element(by.tagName('input'));

    it('should exist', function() {
      expect(heroListComp).toBeDefined('<hero-list> must exist');
    });

    it('should display ' + initialHeroCount + ' heroes after init', function () {
      expect(heroTags.count()).toBe(initialHeroCount);
    });

    it('should not add hero with empty name', function () {
      expect(addButton).toBeDefined('"Add Hero" button must be defined');
      addButton.click().then(function() {
        expect(heroTags.count()).toBe(initialHeroCount, 'No new hero should be added');
      });
    })

    it('should add a new hero to the list', function () {
      expect(heroNameInput).toBeDefined('<input> for hero name must exist');
      expect(addButton).toBeDefined('"Add Hero" button must be defined');
      sendKeys(heroNameInput, newHeroName);
      addButton.click().then(function() {
        expect(heroTags.count()).toBe(heroCountAfterAdd, 'A new hero should be added');
        var newHeroInList = heroTags.get(heroCountAfterAdd - 1).getText();
        expect(newHeroInList).toBe(newHeroName, 'The hero should be added to the end of the list');
      });
    })
  });

  describe('Wikipedia Demo', function () {

    it('should initialize the demo with empty result list', function () {
      var myWikiComp = element(by.tagName('my-wiki'));
      expect(myWikiComp).toBeDefined('<my-wiki> must exist');
      var resultList = myWikiComp.all(by.tagName('li'));
      expect(resultList.count()).toBe(0, 'result list must be empty');
    });

    describe('Fetches after each keystroke', function () {
      it('should fetch results after "B"', function(done) {
        testForRefreshedResult('B', done);
      });

      it('should fetch results after "Ba"', function(done) {
        testForRefreshedResult('a', done);
      });

      it('should fetch results after "Bas"', function(done) {
        testForRefreshedResult('s', done);
      });

      it('should fetch results after "Basic"', function(done) {
        testForRefreshedResult('ic', done);
      });
    });

    function testForRefreshedResult(keyPressed, done) {
      testForResult('my-wiki', keyPressed, false, done)
    }
  });

  describe('Smarter Wikipedia Demo', function () {

    it('should initialize the demo with empty result list', function () {
      var myWikiSmartComp = element(by.tagName('my-wiki-smart'));
      expect(myWikiSmartComp).toBeDefined('<my-wiki-smart> must exist');
      var resultList = myWikiSmartComp.all(by.tagName('li'));
      expect(resultList.count()).toBe(0, 'result list must be empty');
    });

    it('should fetch results after "Java"', function(done) {
      testForNewResult('Java', done);
    });

    it('should fetch results after "JavaS"', function(done) {
      testForStaleResult('S', done);
    });

    it('should fetch results after "JavaSc"', function(done) {
      testForStaleResult('c', done);
    });

    it('should fetch results after "JavaScript"', function(done) {
      testForStaleResult('ript', done);
    });


    function testForNewResult(keyPressed, done) {
      testForResult('my-wiki-smart', keyPressed, false, done)
    }

    function testForStaleResult(keyPressed, done) {
      testForResult('my-wiki-smart', keyPressed, true, done)
    }

  });

  function testForResult(componentTagName, keyPressed, hasListBeforeSearch, done) {
    var searchWait = 1000; // Wait for wikipedia but not so long that tests timeout
    var wikiComponent = element(by.tagName(componentTagName));
    expect(wikiComponent).toBeDefined('<' + componentTagName + '> must exist');
    var searchBox = wikiComponent.element(by.tagName('input'));
    expect(searchBox).toBeDefined('<input> for search must exist');

    searchBox.sendKeys(keyPressed).then(function () {
      var resultList = wikiComponent.all(by.tagName('li'));

      if (hasListBeforeSearch) {
        expect(resultList.count()).toBeGreaterThan(0, 'result list should not be empty before search');
      }

      setTimeout(function() {
        expect(resultList.count()).toBeGreaterThan(0, 'result list should not be empty after search');
        done();
      }, searchWait);
    });
  }

});
