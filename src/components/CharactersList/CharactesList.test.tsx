import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill';
import { adaptedCharactersMock } from '../../mocks/adaptedCharacters.mock';
import { CharactersList } from './CharactersList';

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

beforeEach(() => {
  window.resizeTo(1920, 1080);
});
const mockIsItemLoaded = (index: number): boolean => true;
const mockLoadMoreItems = (startIndex: number, stopIndex: number): void => {
  console.log('test');
};

describe('CharacterList', () => {
  it('renders data properly on big screens', () => {
    const rendered = render(
      <CharactersList
        data={adaptedCharactersMock}
        isItemLoaded={mockIsItemLoaded}
        loadMoreItems={mockLoadMoreItems}
      />,
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders data properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(
      <CharactersList
        data={adaptedCharactersMock}
        isItemLoaded={mockIsItemLoaded}
        loadMoreItems={mockLoadMoreItems}
      />,
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders loading spinner properly on big screens', () => {
    const rendered = render(
      <CharactersList
        data={null}
        isItemLoaded={mockIsItemLoaded}
        loadMoreItems={mockLoadMoreItems}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('renders loading skeleton properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(
      <CharactersList
        data={null}
        isItemLoaded={mockIsItemLoaded}
        loadMoreItems={mockLoadMoreItems}
      />,
    );
    expect(rendered).toMatchSnapshot();
  });
});
