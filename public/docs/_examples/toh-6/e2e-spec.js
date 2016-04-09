describe('TOH Http Chapter', function () {

  beforeEach(function () {
    browser.get('');
  });

  function getPageStruct() {
    hrefEles = element.all(by.css('my-app a'));

    return {
      hrefs: hrefEles,
      myDashboardHref: hrefEles.get(0),
      myDashboardParent: element(by.css('my-app my-dashboard')),
      topHeroes: element.all(by.css('my-app my-dashboard .module.hero')),

      myHeroesHref: hrefEles.get(1),
      myHeroesParent: element(by.css('my-app my-heroes')),
      allHeroes: element.all(by.css('my-app my-heroes li .hero-element')),
      
      firstDeleteButton: element.all(by.buttonText('Delete')).get(0),

      addButton: element.all(by.buttonText('Add New Hero')).get(0),

      heroDetail: element(by.css('my-app my-hero-detail'))
    }
  }

  it('should be able to add a hero from the "Heroes" view', function(){
    var page = getPageStruct();
    var heroCount;
    
    page.myHeroesHref.click().then(function() {
      browser.waitForAngular();
      heroCount = page.allHeroes.count();
      expect(heroCount).toBe(4, 'should show 4');
    }).then(function() {
      return page.addButton.click();
    }).then(function(){
      return save(page,'','The New Hero');
    }).then(function(){
      browser.waitForAngular();
      
      heroCount = page.allHeroes.count();
      expect(heroCount).toBe(5, 'should show 5');
      
      var newHero = element(by.xpath('//span[@class="hero-element" and contains(text(),"The New Hero")]'));
      expect(newHero).toBeDefined();
    });
  });

  it('should be able to delete hero from "Heroes" view', function(){
    var page = getPageStruct();
    var heroCount;
    
    page.myHeroesHref.click().then(function() {
      browser.waitForAngular();
      heroCount = page.allHeroes.count();
      expect(heroCount).toBe(4, 'should show 4');
    }).then(function() {
      return page.firstDeleteButton.click();
    }).then(function(){
      browser.waitForAngular();
      heroCount = page.allHeroes.count();
      expect(heroCount).toBe(3, 'should show 3');
    });
  });

  it('should be able to save details from "Dashboard" view', function () {
    var page = getPageStruct();
    expect(page.myDashboardParent.isPresent()).toBe(true, 'dashboard element should be available');
    var heroEle = page.topHeroes.get(2);
    var heroDescrEle = heroEle.element(by.css('h4'));
    var heroDescr;
    
    return heroDescrEle.getText().then(function(text) {
      heroDescr = text;
      return heroEle.click();
    }).then(function() {
      return save(page, heroDescr, '-foo');
    })
    .then(function(){
      return page.myDashboardHref.click();
    })
    .then(function() {
      expect(page.myDashboardParent.isPresent()).toBe(true, 'dashboard element should be back');
      expect(heroDescrEle.getText()).toEqual(heroDescr + '-foo');
    });
  });

  it('should be able to save details from "Heroes" view', function () {
    var page = getPageStruct();
    
    var viewDetailsButtonEle = page.myHeroesParent.element(by.cssContainingText('button', 'View Details'));
    var heroEle, heroDescr;
    
    page.myHeroesHref.click().then(function() {
      expect(page.myDashboardParent.isPresent()).toBe(false, 'dashboard element should NOT be present');
      expect(page.myHeroesParent.isPresent()).toBe(true, 'myHeroes element should be present');
      expect(viewDetailsButtonEle.isPresent()).toBe(false, 'viewDetails button should not yet be present');
      heroEle = page.allHeroes.get(0);
      return heroEle.getText();
    }).then(function(text) {
      // remove leading 'id' from the element
      heroDescr = text.substr(text.indexOf(' ')+1);
      return heroEle.click();
    }).then(function() {
      expect(viewDetailsButtonEle.isDisplayed()).toBe(true, 'viewDetails button should now be visible');
      return viewDetailsButtonEle.click();
    }).then(function() {
      return save(page, heroDescr, '-bar');
    })
    .then(function(){
      return page.myHeroesHref.click();
    })
    .then(function() {
      expect(heroEle.getText()).toContain(heroDescr + '-bar');
    });
  });

  function save(page, origValue, textToAdd) {
    var inputEle = page.heroDetail.element(by.css('input'));
    expect(inputEle.isDisplayed()).toBe(true, 'should be able to see the input box');
    var saveButtonEle = page.heroDetail.element(by.buttonText('Save'));
    var backButtonEle = page.heroDetail.element(by.buttonText('Back'));
    expect(backButtonEle.isDisplayed()).toBe(true, 'should be able to see the back button');
    var detailTextEle = page.heroDetail.element(by.css('div h2'));
    expect(detailTextEle.getText()).toContain(origValue);
    return sendKeys(inputEle, textToAdd).then(function () {
      expect(detailTextEle.getText()).toContain(origValue + textToAdd);
      return saveButtonEle.click();
    });
  }
});
