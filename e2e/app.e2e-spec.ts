import { LearnAppPage } from './app.po';

describe('learn-app App', function() {
  let page: LearnAppPage;

  beforeEach(() => {
    page = new LearnAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
