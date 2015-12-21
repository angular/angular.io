
describe('Hierarchical dependency injection', function () {


  beforeEach(function () {
    browser.get('');
  });

  it('should open with a card view', function () {
    expect(element(by.css('div > span')).getText()).toContain('Name:');
  });


});
