import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders spinner properly', () => {
    const rendered = render(<LoadingSpinner />);
    expect(rendered).toMatchSnapshot();
  });
});
