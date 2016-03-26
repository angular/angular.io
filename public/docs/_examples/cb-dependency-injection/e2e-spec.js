describe('Dependency Injection Cookbook', function () {

    beforeAll(function () {
        browser.get('');
    });

    it('should render Logged in User example', function () {
      var loggedInUser = element.all(by.xpath('//h3[text()="Logged in user"]')).get(0);
      expect(loggedInUser).toBeDefined();
    });
      
    it('"Bombasto" should be the logged in user', function () {     
      loggedInUser = element.all(by.xpath('//div[text()="Name: Bombasto"]')).get(0);
      expect(loggedInUser).toBeDefined();
    });
    
    it('should render sorted heroes', function () {    
      var sortedHeroes = element.all(by.xpath('//h3[text()="Sorted Heroes" and position()=1]')).get(0);
      expect(sortedHeroes).toBeDefined();
    });    
    
    it('Mr. Nice should be in sorted heroes', function () {
      var sortedHero = element.all(by.xpath('//sorted-heroes/[text()="Mr. Nice" and position()=2]')).get(0);
      expect(sortedHero).toBeDefined();
    });
    
    it('RubberMan should be in sorted heroes', function () {    
      sortedHero = element.all(by.xpath('//sorted-heroes/[text()="RubberMan" and position()=3]')).get(0);
      expect(sortedHero).toBeDefined();
    });
    
    it('Magma should be in sorted heroes', function () {
      sortedHero = element.all(by.xpath('//sorted-heroes/[text()="Magma"]')).get(0);
      expect(sortedHero).toBeDefined();
    });
    
    it('should render Hero of the Month', function () {    
      var heroOfTheMonth = element.all(by.xpath('//h3[text()="Hero of the month"]')).get(0);
      expect(heroOfTheMonth).toBeDefined();
    });
    
    it('should render Hero Bios', function () {    
      var heroBios = element.all(by.xpath('//h3[text()="Hero Bios"]')).get(0);
      expect(heroBios).toBeDefined();
    });
    
    it('should render Magma\'s description in Hero Bios', function () {    
      var magmaText =  element.all(by.xpath('//textarea[text()="Hero of all trades"]')).get(0);
      expect(magmaText).toBeDefined();
    });
    
    it('should render Magma\'s phone in Hero Bios and Contacts', function () {    
      var magmaPhone =  element.all(by.xpath('//div[text()="Phone #: 555-555-5555"]')).get(0);
      expect(magmaPhone).toBeDefined();
    });
    
    it('should render Hero-of-the-Month runner-ups', function () {    
      var runnersUp =  element(by.id('rups')).getText();
      expect(runnersUp).toContain('RubberMan, Mr. Nice');
    });
    
    it('should render DateLogger log entry in Hero-of-the-Month', function () {    
      var logs =  element.all(by.id('logs')).get(0).getText();
      expect(logs).toContain('INFO: starting up at');
    });
    
    it('should highlight Hero Bios and Contacts container when mouseover', function () {
      var target = element(by.css('div[myHighlight="yellow"]'))
      var yellow = "rgba(255, 255, 0, 1)";
      
      expect(target.getCssValue('background-color')).not.toEqual(yellow);
      browser.actions().mouseMove(target).perform();
      expect(target.getCssValue('background-color')).toEqual(yellow);
    });

    describe('in Parent Finder', function () {
      var cathy1 = element(by.css('alex cathy'));
      var craig1 = element(by.css('alex craig'));
      var carol1 = element(by.css('alex carol p'));
      var carol2 = element(by.css('barry carol p'));
      
      it('"Cathy" should find "Alex" via the component class', function () {    
        expect(cathy1.getText()).toContain('Found Alex via the component');
      });
      
      it('"Craig" should not find "Alex" via the base class', function () {    
        expect(craig1.getText()).toContain('Did not find Alex via the base');
      });
      
      it('"Carol" within "Alex" should have "Alex" parent', function () {    
        expect(carol1.getText()).toContain('Alex');
      });
            
      it('"Carol" within "Barry" should have "Barry" parent', function () {    
        expect(carol2.getText()).toContain('Barry');
      });
    })
});
