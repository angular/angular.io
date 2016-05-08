// gulp run-e2e-tests --filter=cb-custom-form-controls
describe('Building Custom Form Controls With ngModel', function () {

  beforeAll(function () {
      browser.get('');
  });

  it('should all be off', function () {

    var toggles = element.all( by.css( 'cb-toggle' ) );

    expect( toggles.getAttribute( 'class' ) ).toContain( "for-off" );
    expect( toggles.getAttribute( 'class' ) ).not.toContain( "for-on" );

  });

  it('should all toggle on', function () {

    var toggle = element.all( by.css( 'cb-toggle' ) ).first();

    toggle.click();

    var toggles = element.all( by.css( 'cb-toggle' ) );

    expect( toggles.getAttribute( 'class' ) ).toContain( "for-on" );
    expect( toggles.getAttribute( 'class' ) ).not.toContain( "for-off" );

  });

  it('should use ng-form classes that reflect interactions', function () {

    var toggle = element.all( by.css( 'cb-toggle' ) ).last();

    expect( toggle.getAttribute( 'class' ) ).toContain( 'ng-pristine' );
    expect( toggle.getAttribute( 'class' ) ).not.toContain( 'ng-dirty' );

    toggle.click();

    expect( toggle.getAttribute( 'class' ) ).toContain( 'ng-dirty' );
    expect( toggle.getAttribute( 'class' ) ).not.toContain( 'ng-pristine' );

    var toggles = element.all( by.css( 'cb-toggle' ) );

    expect( toggles.getAttribute( 'class' ) ).toContain( "for-off" );
    expect( toggles.getAttribute( 'class' ) ).not.toContain( "for-on" );

  });

});
