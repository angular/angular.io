describe('Server Communication', function () {

  beforeAll(function () {
    browser.get('');
  });

  describe('Tour of Heroes e2e tests', function () {
    
    var _initialHeroCount = 4;
    var _newHeroName = 'Mr. IQ';
    var _heroCountAfterAdd = 5;
    
    it('should display ' + _initialHeroCount + 'heroes after init', function () {
      var myTohComp = element(by.tagName('my-toh'));
      expect(myTohComp).toBeDefined('<my-toh> must exist');
      var heroListComp = myTohComp.element(by.tagName('hero-list'));
      expect(heroListComp).toBeDefined('<hero-list> must exist');
      var heroTags = heroListComp.all(by.tagName('li'));
      expect(heroTags.count()).toBe(_initialHeroCount);
    });
    
    it('should not add hero with empty name', function () {
      var myTohComp = element(by.tagName('my-toh'));
      expect(myTohComp).toBeDefined('<my-toh> must exist');
      var addButton = myTohComp.element(by.tagName('button'));
      expect(addButton).toBeDefined('"Add Hero" button must be defined');
      addButton.click().then(function() {
        var heroListComp = myTohComp.element(by.tagName('hero-list'));
        var heroTags = heroListComp.all(by.tagName('li'));
        expect(heroTags.count()).toBe(_initialHeroCount, 'No new hero should be added');
      });
    })

    it('should add a new hero to the list', function () {
      var myTohComp = element(by.tagName('my-toh'));
      expect(myTohComp).toBeDefined('<my-toh> must exist');
      var heroNameInput = myTohComp.element(by.tagName('input'));
      expect(heroNameInput).toBeDefined('<input> for hero name must exist');
      var addButton = myTohComp.element(by.tagName('button'));
      expect(addButton).toBeDefined('"Add Hero" button must be defined');
      sendKeys(heroNameInput, _newHeroName);
      addButton.click().then(function() {
        var heroListComp = myTohComp.element(by.tagName('hero-list'));
        var heroTags = heroListComp.all(by.tagName('li'));
        expect(heroTags.count()).toBe(_heroCountAfterAdd, 'A new hero should be added');
        var newHeroInList = heroTags.get(_heroCountAfterAdd - 1).getText();
        expect(newHeroInList).toBe(_newHeroName, 'The hero should be added to the end of the list');
      });
    })
  });
  
  describe('Wikipedia Demo e2e tests', function () {
    
    // The test may fail if we do not get answer from Wikipedia in such a long timeout
    var _timeoutAfterKeystroke = 1000;
    
    it('should initialize the demo with empty result list', function () {
      var myWikiComp = element(by.tagName('my-wiki'));
      expect(myWikiComp).toBeDefined('<my-wiki> must exist');
      var resultList = myWikiComp.all(by.tagName('li'));
      expect(resultList.count()).toBe(0, 'result list must be empty');
    });
    
    /*
      It is not easy to make distinction between the "Wikipedia Demo" and "Smarter Wikipedia Demo"
      with E2E tests. We use a little hack: when running "Wikipedia Demo", as soon as we send a new
      key to the search field, the result is immediately deleted, unlike when running "Smarter Wikipedia
      Demo", where the previous search result is not deleted due to 'distinctUntilChanged()'.
      
      With the 'testForRefreshedResult()' method we check that the result list is immediately deleted after
      sending a key to the search field, but contains more than 0 items when the search is completed.
    */
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
      var myWikiComp = element(by.tagName('my-wiki'));
      expect(myWikiComp).toBeDefined('<my-wiki> must exist');
      var searchBox = myWikiComp.element(by.tagName('input'));
      expect(searchBox).toBeDefined('<input> for search must exist');
      searchBox.sendKeys(keyPressed).then(function () {
        var resultList = myWikiComp.all(by.tagName('li'));
        setTimeout(function() {
          expect(resultList.count()).toBeGreaterThan(0, 'result list should not be empty');
          done();
        }, _timeoutAfterKeystroke);
      });
    }
  });
  
  describe('Smarter Wikipedia Demo e2e tests', function () {
    var _searchTimeOut = 1000;

    it('should initialize the demo with empty result list', function () {
      var myWikiSmartComp = element(by.tagName('my-wiki-smart'));
      expect(myWikiSmartComp).toBeDefined('<my-wiki-smart> must exist');
      var resultList = myWikiSmartComp.all(by.tagName('li'));
      expect(resultList.count()).toBe(0, 'result list must be empty');
    });

    /*
      It is not easy to make distinction between the "Wikipedia Demo" and "Smarter Wikipedia Demo"
      with E2E tests. We use a little hack: when running "Wikipedia Demo", as soon as we send a new
      key to the search field, the result is immediately deleted, unlike when running "Smarter Wikipedia
      Demo", where the previous search result is not deleted due to 'distinctUntilChanged()'.
      
      With the 'testForNewResult()' method we check that the result list contains more than 0 items 
      when the search is completed.

      With the 'testForStaleResult()' method we check that the result list contains items right after
      sending a key to the search field, and contains more than 0 items when the search is completed.
    */
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
      var myWikiSmartComp = element(by.tagName('my-wiki-smart'));
      expect(myWikiSmartComp).toBeDefined('<my-wiki-smart> must exist');
      var searchBox = myWikiSmartComp.element(by.tagName('input'));
      expect(searchBox).toBeDefined('<input> for search must exist');
      searchBox.sendKeys(keyPressed).then(function () {
        setTimeout(function() {
          var resultList = myWikiSmartComp.all(by.tagName('li'));
          expect(resultList.count()).toBeGreaterThan(0, 'result list should not be empty after search');
          done();
        }, _searchTimeOut);
      });
    }

    function testForStaleResult(keyPressed, done) {
      var myWikiSmartComp = element(by.tagName('my-wiki-smart'));
      expect(myWikiSmartComp).toBeDefined('<my-wiki-smart> must exist');
      var searchBox = myWikiSmartComp.element(by.tagName('input'));
      expect(searchBox).toBeDefined('<input> for search must exist');
      searchBox.sendKeys(keyPressed).then(function () {
        var resultList = myWikiSmartComp.all(by.tagName('li'));
        expect(resultList.count()).toBeGreaterThan(0, 'result list should not be empty before search');
        setTimeout(function() {
          expect(resultList.count()).toBeGreaterThan(0, 'result list should not be empty after search');
          done();
        }, _searchTimeOut);
      });
    }
  });
});