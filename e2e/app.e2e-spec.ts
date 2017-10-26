import { DrinkRulesPage } from './app.po';

describe('drink-rules App', () => {
  let page: DrinkRulesPage;

  beforeEach(() => {
    page = new DrinkRulesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
