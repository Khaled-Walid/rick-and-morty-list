import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill';
import { adaptedCharactersMock } from '../../mocks/adaptedCharacters.mock';
import { CharacterCard } from './CharacterCard';

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

describe('CharacterCard', () => {
  it('renders data properly on big screens', () => {
    const rendered = render(
      <CharacterCard character={adaptedCharactersMock[0].character} />,
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders data properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(
      <CharacterCard character={adaptedCharactersMock[0].character} />,
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders loading skeleton properly on big screens', () => {
    const rendered = render(<CharacterCard character={null} />);

    expect(rendered).toMatchSnapshot();
  });

  it('renders loading skeleton properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(<CharacterCard character={null} />);
    expect(rendered).toMatchSnapshot();
  });
});
