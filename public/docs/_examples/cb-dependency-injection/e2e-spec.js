describe('Dependency Injection Cookbook Tests', function () {

  beforeAll(function () {
    browser.get('');
  });

  describe('Inject a service into a component', function() {
    // #docregion singleton
    // ...
    it('should instantiate, inject and invoke the service', function () {
      var expectedCount = 3;
      
      var steps = element(by.tagName('my-triangle'))
        .all(by.tagName('li'));
      expect(steps.count()).toBe(expectedCount);
      for (var i = 0; i < steps.length; i++) {
        expect(steps.get(i).getText()).toContain('Point #' + i);
      }
    });
    // ...
    // #enddocregion singleton
  });

  describe('Inject a service into another service', function() {
    // #docregion service
    // ...
    it('should instantiate, inject and invoke PenService', function () {
      var expectedPenText = "Using yellow pen";
      var steps = element(by.tagName('my-square'))
        .all(by.tagName('li'));
      expect(steps.count()).toBeGreaterThan(0);
      expect(steps.get(0).getText()).toBe(expectedPenText);
    });

    it('should instantiate, inject and invoke DrawWithPenService', function () {
      var expectedCount = 5;
      var steps = element(by.tagName('my-square'))
        .all(by.tagName('li'));
      expect(steps.count()).toBe(expectedCount);
      for (var i = 1; i < steps.length; i++) {
        expect(steps.get(i).getText()).toContain('Point #' + (i-1));
      }
    });
    // ...
    // #enddocregion service
  });

  describe('Inject service instances into the children of a component', function() {
    // #docregion children
    // ...
    it('should instantiate a singleton RectangleDrawService instance', function () {
      var rectangleCount = 3;
      
      var rectangles = element(by.tagName('my-canvas'))
        .all(by.tagName('rectangle'));
      expect(rectangles.count()).toBe(rectangleCount)
      for (var i = 0; i < rectangleCount; i++) {
        expect(rectangles.get(i).getText())
          .toContain("RectangleDraw instance: #0");
      }
    });

    it('should instantiate separate BorderDrawService intances', function () {
      var rectangleCount = 3;
      
      var rectangles = element(by.tagName('my-canvas'))
        .all(by.tagName('rectangle'));
      expect(rectangles.count()).toBe(rectangleCount)
      for (var i = 0; i < rectangleCount; i++) {
        expect(rectangles.get(i).getText())
          .toContain("BorderDraw instance: #" + i);
      }
    });
    // ...
    // #enddocregion children
  });

  describe('Use an optional dependency', function() {
    // #docregion optional
    // ...
    it('should instantiate, inject and invoke DrawService for TriangleComponent', function () {
      var expectedCount = 3;
      
      var steps = element(by.tagName('my-shapes')).element(by.tagName('my-triangle'))
        .all(by.tagName('li'));
      expect(steps.count()).toBe(expectedCount);
      for (var i = 0; i < steps.length; i++) {
        expect(steps.get(i).getText()).toContain('Point #' + i);
      }
    });

    it('should replace optional service with internal implementaion in LineComponent', function () {
      var expectedCount = 1;
      var fakeStep = "Fake shape with 2 points";

      var steps = element(by.tagName('my-shapes'))
        .element(by.tagName('my-line'))
        .all(by.tagName('li'));
      expect(steps.count()).toBe(expectedCount);
      expect(steps.get(0).getText()).toBe(fakeStep);
    });
    // ...
    // #enddocregion optional
  });

  describe('Inject a non-class dependency with a string token', function() {
    // #docregion non-class-dependency
    // ...
    it('should use the prefix and suffix values as expected', function () {
      var prefix = '<<$';
      var suffix = '$#>>';
      var original = 'This must be a secret!';
      
      var encoderComp = element(by.tagName('my-message-encoder'));
      var input = encoderComp.element(by.tagName('input'));
      var encoded = encoderComp.element(by.tagName('code'));
      
      sendKeys(input, original).then(function() {
        expect(encoded.getText()).toBe(prefix + original + suffix);
      })
    });
    // ...
    // #enddocregion non-class-dependency
  });

  describe('Use a value provider', function() {
    // #docregion value-provider
    // ...
    it('should use the provided value instead of CircleApi', function () {
      var expectedInstruction = "circle(100, 75, 14);";
      
      var instructions = element(by.tagName('my-paint'))
        .element(by.tagName('code'));
      expect(instructions.getText()).toBe(expectedInstruction);
    });
    // ...
    // #enddocregion value-provider
  });
  
  describe('Provide a new or alternative implementation of a service', function() {
    // #docregion alternative
    // ...
    it('should use the new version, Crypto2Service', function () {
      var original = 'Top secret!';
      var secret = '@!terces poT@';
      
      var enigmaComp = element(by.tagName('my-enigma'));
      var input = enigmaComp.element(by.tagName('input'));
      var encoded = enigmaComp.element(by.tagName('code'));
      
      sendKeys(input, original).then(function() {
        expect(encoded.getText()).toBe(secret);
      })
    });
    // ...
    // #enddocregion alternative
  });
  

  describe('Use a service factory provider', function() {
    // #docregion factory
    // ...
    it('should use red background with RED login', function () {
      var expectedBackground = 'rgba(255, 0, 0, 1)'; // red
      
      var themedComp = element(by.tagName('my-themed-app'));
      var redLoginBtn = themedComp.all(by.tagName('button')).get(0);
      redLoginBtn.click().then(function () {
        var rectangleDiv = themedComp.element(by.tagName('themed-rectangle'))
          .element(by.tagName('div'));
        expect(rectangleDiv.getCssValue('background-color')).toBe(expectedBackground);
      })
    });

    it('should logout the current user', function () {
      var themedComp = element(by.tagName('my-themed-app'));
      var logoutBtn = themedComp.all(by.tagName('button')).get(2);
      logoutBtn.click().then(function () {
        var rectangle = themedComp.all(by.tagName('themed-rectangle'));
        expect(rectangle.count()).toBe(0);
      })
    });

    it('should use green background with GREEN login', function () {
      var expectedBackground = 'rgba(0, 128, 0, 1)'; // green
      
      var themedComp = element(by.tagName('my-themed-app'));
      var greenLoginBtn = themedComp.all(by.tagName('button')).get(1);
      greenLoginBtn.click().then(function () {
        var rectangleDiv = themedComp.element(by.tagName('themed-rectangle'))
          .element(by.tagName('div'));
        expect(rectangleDiv.getCssValue('background-color')).toBe(expectedBackground);
      })
    });
    // ...
    // #enddocregion factory
  });

  describe('Inject a non-class dependency with OpaqueToken', function() {
    // #docregion opaque-token
    // ...
    it('should diplay ellipses with the expected dimensions', function () {
      var expectedWidth1 = '100px';
      var expectedHeight1 = '75px';
      var expectedWidth2 = '150px';
      var expectedHeight2 = '112.5px';
      
      var canvasComp = element(by.tagName('my-ellipse-canvas'));
      var ellipseDims1 = canvasComp.all(by.tagName('ellipse'))
        .get(0)
        .element(by.tagName('div'));
      var ellipseDims2 = canvasComp.all(by.tagName('ellipse'))
        .get(1)
        .element(by.tagName('div'));
      
      expect(ellipseDims1.getCssValue('width')).toBe(expectedWidth1);
      expect(ellipseDims1.getCssValue('height')).toBe(expectedHeight1);
      expect(ellipseDims2.getCssValue('width')).toBe(expectedWidth2);
      expect(ellipseDims2.getCssValue('height')).toBe(expectedHeight2);
    });
    // ...
    // #enddocregion opaque-token
  });
  
});