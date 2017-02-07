require('ts-node/register');
var expect = require('chai').expect;

const Migrator = require('./migrator').Migrator;

describe('migrator', () => {
  let migrator;
  beforeEach(() => {
    migrator = new Migrator();
  })
  it('should remove `include ../_util-fns`', () => {
    expect(migrator.process(_(
      'include ../_util-fns',
      '',
      'other content'
    ))).to.equal(_(
      'other content'
    ));
  });

  it('should remove and unindent `.l-main-section`', () => {
    expect(migrator.process(_(
      'Some content',
      '',
      '.l-main-section',
      '## some heading'
    ))).to.equal(_(
      'Some content',
      '',
      '## some heading'
    ));
  });

  it('should remove and unindent `.l-sub-section`', () => {
    expect(migrator.process(_(
      'Some content',
      '',
      '.l-sub-section',
      '  ## some heading'
    ))).to.equal(_(
      'Some content',
      '',
      '## some heading'
    ));
  })

  it('should convert `.alert` components', () => {
    expect(migrator.process(_(
      '.alert.is-important',
      '  abc',
      '',
      '  xyz',
      '',
      '',
      'new content',
      '',
      '.alert.is-helpful',
      '  content'
    ))).to.equal(_(
      '~~~ {.alert.is-important}',
      '',
      'abc',
      '',
      'xyz',
      '',
      '',
      '~~~',
      '',
      'new content',
      '',
      '~~~ {.alert.is-helpful}',
      '',
      'content',
      '',
      '~~~',
      ''
    ));
  });

  it('should remove and unindent `:marked` blocks', () => {
    expect(migrator.process(_(
      'some-element',
      '  :marked',
      '    # heading 1',
      '',
      '  :marked',
      '    a paragraph'
    ))).to.equal(_(
      'some-element',
      '  # heading 1',
      '',
      '  a paragraph'
    ));
  });

  it('should convert +makeExample(...)', () => {
    expect(migrator.process(_(
      '+makeExample(\'cb-component-relative-paths/ts/src/app/some.component.ts\',\'module-id\')(format=\'.\')'
    ))).to.equal(_(
      '{@example \'cb-component-relative-paths/ts/src/app/some.component.ts\' region=\'module-id\' linenums=\'false\'}'
    ));
  });

  it('should convert +makeTabs(...)', () => {
    expect(migrator.process(_(
      '+makeTabs(',
      '  `cb-component-relative-paths/ts/src/app/some.component.ts,',
      '  cb-component-relative-paths/ts/src/app/some.component.html,',
      '  cb-component-relative-paths/ts/src/app/some.component.css,',
      '  cb-component-relative-paths/ts/src/app/app.component.ts`,',
      '  null,',
      '  `src/app/some.component.ts, src/app/some.component.html, src/app/some.component.css, src/app/app.component.ts`)'
    ))).to.equal(_(
      '<md-tab-group>',
      '  <md-tab label="src/app/some.component.ts">',
      '    {@example \'cb-component-relative-paths/ts/src/app/some.component.ts\'}',
      '  </md-tab>',
      '  <md-tab label="src/app/some.component.html">',
      '    {@example \'cb-component-relative-paths/ts/src/app/some.component.html\'}',
      '  </md-tab>',
      '  <md-tab label="src/app/some.component.css">',
      '    {@example \'cb-component-relative-paths/ts/src/app/some.component.css\'}',
      '  </md-tab>',
      '  <md-tab label="src/app/app.component.ts">',
      '    {@example \'cb-component-relative-paths/ts/src/app/app.component.ts\'}',
      '  </md-tab>',
      '</md-tab-group>'
      ));
  });
});

function _(...lines) {
  return lines.join('\n');
}