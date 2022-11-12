import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CharactersListController } from './CharactersListController';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { charactersMock } from '../../mocks/characters.mock';
import { getCharactersQuery } from '../../data/query';
import { Characters } from '../../data/types';
import { FetchResult } from '@apollo/client';

const getGrahpqlMock: (
  results: FetchResult<Characters>,
) => ReadonlyArray<MockedResponse<Characters>> = (results) => [
  {
    request: {
      query: getCharactersQuery,
      variables: {
        page: 1,
      },
    },
    result: results,
  },
];

describe('CharactersListControllerDomSnapshot', () => {
  it('renders CharactersList properly', async () => {
    const rendered = render(
      <MockedProvider
        mocks={getGrahpqlMock({ data: charactersMock })}
        addTypename={false}
      >
        <CharactersListController />
      </MockedProvider>,
    );
    expect(await screen.findByText('Loading')).toBeInTheDocument();
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(rendered).toMatchSnapshot();
  });
});
