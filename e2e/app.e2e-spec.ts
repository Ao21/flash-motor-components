import { Mobile0Page } from './app.po';

describe('mobile-0 App', function() {
  let page: Mobile0Page;

  beforeEach(() => {
    page = new Mobile0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
