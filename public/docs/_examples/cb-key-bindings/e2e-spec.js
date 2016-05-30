// gulp run-e2e-tests --filter=cb-key-bindings --fast
describe('Key combination bindings', function () {

  beforeAll(function () {
      browser.get('');
  });

  it('should pick up key combinations', function () {

    var input = element( by.css( 'input' ) );

    input.click();

    input.sendKeys( protractor.Key.ENTER );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'Enter' );

    input.sendKeys( protractor.Key.SHIFT, protractor.Key.ENTER );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'Shift+Enter' );

    input.sendKeys( protractor.Key.META, protractor.Key.ENTER );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'Meta+Enter' );

    input.sendKeys( ' ' );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'Space' );

    input.sendKeys( 'a' );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'a' );

    input.sendKeys( protractor.Key.SHIFT, 'a' );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'A' );

    input.sendKeys( protractor.Key.ESCAPE );
    expect( element.all( by.css( 'li' ) ).last().getText() ).toContain( 'Escape' );

  });

});
