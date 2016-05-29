describe('User Input Tests', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should support the click event', function () {
    var mainEle = element(by.css('click-me'));
    var buttonEle =element(by.css('click-me button'));
    expect(mainEle.getText()).not.toContain('You are my hero!');
    buttonEle.click().then(function() {
      expect(mainEle.getText()).toContain('You are my hero!');
    });
  });

  it('should support the click event with an event payload', function () {
    var mainEle = element(by.css('click-me2'));
    var buttonEle =element(by.css('click-me2 button'));
    expect(mainEle.getText()).not.toContain('Event target is ');
    buttonEle.click().then(function() {
      expect(mainEle.getText()).toContain('Event target is BUTTON');
    })
  });

  it('should support the keyup event ', function () {
    var mainEle = element(by.css('key-up1'));
    var inputEle = mainEle.element(by.css('input'));
    var outputTextEle = mainEle.element(by.css('p'));
    expect(outputTextEle.getText()).toEqual('');
    return sendKeys(inputEle,'abc').then(function() {
      expect(outputTextEle.getText()).toEqual('a | ab | abc |');
    });
  });

  it('should support user input from a local template var (loopback)', function () {
    var mainEle = element(by.css('loop-back'));
    var inputEle = mainEle.element(by.css('input'));
    var outputTextEle = mainEle.element(by.css('p'));
    expect(outputTextEle.getText()).toEqual('');
    return sendKeys(inputEle,'abc').then(function() {
      expect(outputTextEle.getText()).toEqual('abc');
    });
  });

  it('should be able to combine click event with a local template var', function () {
    var mainEle = element(by.css('key-up2'));
    var inputEle = mainEle.element(by.css('input'));
    var outputTextEle = mainEle.element(by.css('p'));
    expect(outputTextEle.getText()).toEqual('');
    return sendKeys(inputEle,'abc').then(function() {
      expect(outputTextEle.getText()).toEqual('a | ab | abc |');
    });
  });

  it('should be able to filter key events', function () {
    var mainEle = element(by.css('key-up3'));
    var inputEle = mainEle.element(by.css('input'));
    var outputTextEle = mainEle.element(by.css('p'));
    expect(outputTextEle.getText()).toEqual('');
    return sendKeys(inputEle,'abc').then(function() {
      expect(outputTextEle.getText()).toEqual('', 'should be blank - have not sent enter yet');
      return sendKeys(inputEle, protractor.Key.ENTER);
    }).then(function() {
      expect(outputTextEle.getText()).toEqual('abc');
    });
  });

  it('should be able to filter blur events', function () {
    var prevInputEle = element(by.css('key-up3 input'));
    var mainEle = element(by.css('key-up4'));
    var inputEle = mainEle.element(by.css('input'));
    var outputTextEle = mainEle.element(by.css('p'));
    expect(outputTextEle.getText()).toEqual('');
    return sendKeys(inputEle,'abc').then(function() {
      expect(outputTextEle.getText()).toEqual('', 'should be blank - have not sent enter yet');
      // change the focus
      return prevInputEle.click();
    }).then(function() {
      expect(outputTextEle.getText()).toEqual('abc');
    });
  });

  it('should be able to compose little tour of heroes', function () {
    var mainEle = element(by.css('little-tour'));
    var inputEle = mainEle.element(by.css('input'));
    var addButtonEle = mainEle.element(by.css('button'));
    var heroEles = mainEle.all(by.css('li'));
    var numHeroes;
    expect(heroEles.count()).toBeGreaterThan(0);
    heroEles.count().then(function(count) {
      numHeroes = count;
      return sendKeys(inputEle, 'abc');
    }).then(function() {
      return addButtonEle.click();
    }).then(function() {
      expect(heroEles.count()).toEqual(numHeroes + 1, 'should be one more hero added');
      expect(heroEles.get(numHeroes).getText()).toContain('abc');
    });
  });
});

