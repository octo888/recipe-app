import { Ang2AppPage } from './app.po';

describe('ang2-app App', () => {
  let page: Ang2AppPage;

  beforeEach(() => {
    page = new Ang2AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
