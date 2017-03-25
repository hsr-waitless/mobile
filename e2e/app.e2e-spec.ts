import { WaitlessWebPage } from './app.po';

describe('waitless-web App', () => {
  let page: WaitlessWebPage;

  beforeEach(() => {
    page = new WaitlessWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
