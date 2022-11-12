import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill';
import { adaptedCharactersMock } from '../../mocks/adaptedCharacters.mock';
import { CharacterCard } from '../CharacterCard';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { DynamicList } from './DynamicList';

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

const TestDynamicList = ({
  data = adaptedCharactersMock,
}: {
  data?: CharacterCardProps[] | null;
}): JSX.Element => {
  const mockIsItemLoaded = (index: number): boolean => true;
  const mockLoadMoreItems = (startIndex: number, stopIndex: number): void => {
    console.log('test');
  };
  return (
    <DynamicList
      ItemComponent={CharacterCard}
      data={data}
      SpinnerComponent={LoadingSpinner}
      NoDataComponent={() => <div>test empty component</div>}
      listConfig={{
        itemHeight: 470,
        windowHeight: 860,
        numItems: adaptedCharactersMock?.length ?? 0,
        windowWidth: 300,
        loadMoreItems: mockLoadMoreItems,
        isItemLoaded: mockIsItemLoaded,
      }}
    />
  );
};

describe('DynamicList', () => {
  it('renders data properly on big screens', () => {
    const rendered = render(<TestDynamicList />);
    expect(rendered).toMatchSnapshot();
  });

  it('renders data properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(<TestDynamicList />);
    expect(rendered).toMatchSnapshot();
  });

  it('renders loading spinner properly on big screens', () => {
    const rendered = render(<TestDynamicList data={null} />);

    expect(rendered).toMatchSnapshot();
  });

  it('renders loading skeleton properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(<TestDynamicList data={null} />);
    expect(rendered).toMatchSnapshot();
  });

  it('renders empty component properly on big screens', () => {
    const rendered = render(<TestDynamicList data={[]} />);

    expect(rendered).toMatchSnapshot();
  });

  it('renders empty component  properly on small screens', () => {
    window.resizeTo(375, 667);
    const rendered = render(<TestDynamicList data={[]} />);
    expect(rendered).toMatchSnapshot();
  });
});
