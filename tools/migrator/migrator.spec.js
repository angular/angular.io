require('ts-node/register');
var expect = require('expect.js');

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

  it('should remove `.l-main-section`', () => {
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

  it('should convert alerts', () => {
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

  it('should remove `:marked` blocks', () => {
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
  })
});

function _(...lines) {
  return lines.join('\n');
}