import { CloudcoderPage } from './app.po';

describe('cloudcoder App', function() {
  let page: CloudcoderPage;

  beforeEach(() => {
    page = new CloudcoderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
