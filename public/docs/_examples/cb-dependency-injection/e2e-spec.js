describe('Dependency Injection', function () {

    beforeAll(function () {
        browser.get('');
    });

    it('should render DI samples', function () {
      var loggedInUser = element.all(by.xpath('//h3[text()="Logged in user"]')).get(0);
      expect(loggedInUser).toBeDefined();
      
      loggedInUser = element.all(by.xpath('//div[text()="Name: Bombasto"]')).get(0);
      expect(loggedInUser).toBeDefined();
      
      var sortedHeroes = element.all(by.xpath('//h3[text()="Sorted Heroes" and position()=1]')).get(0);
      expect(sortedHeroes).toBeDefined();
      
      var sortedHero = element.all(by.xpath('//sorted-heroes/[text()="Mr. Nice" and position()=2]')).get(0);
      expect(sortedHero).toBeDefined();
      
      sortedHero = element.all(by.xpath('//sorted-heroes/[text()="RubberMan" and position()=3]')).get(0);
      expect(sortedHero).toBeDefined();
      
      sortedHero = element.all(by.xpath('//sorted-heroes/[text()="Magma"]')).get(0);
      expect(sortedHero).toBeDefined();
      
      var heroOfTheMonth = element.all(by.xpath('//h3[text()="Hero of the month"]')).get(0);
      expect(heroOfTheMonth).toBeDefined();
      
      var heroBios = element.all(by.xpath('//h3[text()="Hero Bios"]')).get(0);
      expect(heroBios).toBeDefined();
      
      var magmaText =  element.all(by.xpath('//textarea[text()="Hero of all trades"]')).get(0);
      expect(magmaText).toBeDefined();
      
      var magmaPhone =  element.all(by.xpath('//div[text()="Phone #: 555-555-5555"]')).get(0);
      expect(magmaPhone).toBeDefined();
      
      var runnersUp =  element.all(by.xpath('//h4[text()="Other candidates RubberMan, Mr. Nice"]')).get(0);
      expect(runnersUp).toBeDefined();
    });
});
