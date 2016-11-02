import { ReceiptStorePage } from './app.po';

describe('receipt-store App', function() {
  let page: ReceiptStorePage;

  beforeEach(() => {
    page = new ReceiptStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
