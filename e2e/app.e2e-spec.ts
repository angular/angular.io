import { NgioPage } from './app.po';

describe('ngio App', function() {
  let page: NgioPage;

  beforeEach(() => {
    page = new NgioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngio app works!');
  });
});
