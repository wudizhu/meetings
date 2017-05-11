import { GiftsPage } from './app.po';

describe('gifts App', () => {
  let page: GiftsPage;

  beforeEach(() => {
    page = new GiftsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
