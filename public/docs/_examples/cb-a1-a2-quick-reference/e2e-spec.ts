describe('Angular 1 to 2 Quick Reference Tests', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should display no poster images after bootstrap', function () {
    testImagesAreDisplayed(false);
  });

  it('should display proper movie data', function () {
    // We check only a few samples
    var expectedSamples = [
      {row: 0, column: 0, element: 'img', attr: 'src', value: 'images/hero.png', contains: true},
      {row: 0, column: 2, value: 'Celeritas'},
      {row: 1, column: 3, matches: /Dec 1[678], 2015/}, // absorb timezone dif; we care about date format
      {row: 1, column: 5, value: '$14.95'},
      {row: 2, column: 4, value: 'PG-13'},
      {row: 2, column: 7, value: '100%'},
      {row: 2, column: 0, element: 'img', attr: 'src', value: 'images/ng-logo.png', contains: true},
    ];

    // Go through the samples
    var movieRows = getMovieRows();
    for (var i = 0; i < expectedSamples.length; i++) {
      var sample = expectedSamples[i];
      var tableCell = movieRows.get(sample.row)
        .all(by.tagName('td')).get(sample.column);
      // Check the cell or its nested element
      var elementToCheck = sample.element
        ? tableCell.element(by.tagName(sample.element))
        : tableCell;

      // Check element attribute or text
      var valueToCheck = sample.attr
        ? elementToCheck.getAttribute(sample.attr)
        : elementToCheck.getText();

      // Test for equals/contains/match
      if (sample.contains) {
        expect(valueToCheck).toContain(sample.value);
      } else if (sample.matches) {
        expect(valueToCheck).toMatch(sample.matches);
      } else {
        expect(valueToCheck).toEqual(sample.value);
      }
    }
  });

  it('should display images after Show Poster', function () {
    testPosterButtonClick("Show Poster", true);
  });

  it('should hide images after Hide Poster', function () {
    testPosterButtonClick("Hide Poster", false);
  });

  it('should display no movie when no favorite hero is specified', function () {
    testFavoriteHero(null, "Please enter your favorite hero.");
  });

  it('should display no movie for Magneta', function () {
    testFavoriteHero("Magneta", "No movie, sorry!");
  });

  it('should display a movie for Mr. Nice', function () {
    testFavoriteHero("Mr. Nice", "Excellent choice!");
  });

  function testImagesAreDisplayed(isDisplayed) {
    var expectedMovieCount = 3;

    var movieRows = getMovieRows();
    expect(movieRows.count()).toBe(expectedMovieCount);
    for (var i = 0; i < expectedMovieCount; i++) {
      var movieImage = movieRows.get(i).element(by.css('td > img'));
      expect(movieImage.isDisplayed()).toBe(isDisplayed);
    }
  }

  function testPosterButtonClick(expectedButtonText, isDisplayed) {
    var posterButton = element(by.css('movie-list tr > th > button'));
    expect(posterButton.getText()).toBe(expectedButtonText);

    posterButton.click().then(function () {
      testImagesAreDisplayed(isDisplayed);
    })
  }

  function getMovieRows() {
    return element.all(by.css('movie-list tbody > tr'));
  }

  function testFavoriteHero(heroName, expectedLabel) {
    var movieListComp = element(by.tagName('movie-list'));
    var heroInput = movieListComp.element(by.tagName('input'));
    var favoriteHeroLabel = movieListComp.element(by.tagName('h3'));
    var resultLabel = movieListComp.element(by.css('span > p'));

    heroInput.clear().then(function () {
      sendKeys(heroInput, heroName || '').then(function () {
        expect(resultLabel.getText()).toBe(expectedLabel);
        if (heroName) {
          expect(favoriteHeroLabel.isDisplayed()).toBe(true);
          expect(favoriteHeroLabel.getText()).toContain(heroName);
        } else {
          expect(favoriteHeroLabel.isDisplayed()).toBe(false);
        }
      })
    })
  }
});
