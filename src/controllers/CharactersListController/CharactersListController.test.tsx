import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CharactersListController } from './CharactersListController';
import { charactersMock } from '../../mocks/characters.mock';
import { CharactersList } from '../../components/CharactersList';
import { useQuery } from '@apollo/client';
import { adaptedCharactersMock } from '../../mocks/adaptedCharacters.mock';
import { useCharactersStore } from '../../data/store';

afterEach(() => {
  jest.clearAllMocks();
});
jest.mock('../../components/CharactersList');
jest.mock('@apollo/client');
jest.mock('../../data/store');

describe('CharactersListController', () => {
  it('does not update data when an error exists', () => {
    jest.mocked(useQuery, true).mockReturnValue({
      loading: false,
      error: new Error('An error occurred'),
      data: null,
      fetchMore: jest.fn(),
    } as any);
    const updateData = jest.fn();
    jest.mocked(useCharactersStore, true).mockReturnValue({
      characterData: charactersMock.characters.results,
      nextPage: null,
      updateData,
    });
    render(<CharactersListController />);
    expect(updateData).not.toHaveBeenCalled();
  });

  it('adapts data properly to only characterData when nextPage = null', () => {
    jest.mocked(useQuery, true).mockReturnValue({
      loading: false,
      data: charactersMock,
      fetchMore: jest.fn(),
    } as any);
    jest.mocked(useCharactersStore, true).mockReturnValue({
      characterData: charactersMock.characters.results,
      nextPage: null,
      updateData: jest.fn(),
    });
    render(<CharactersListController />);
    expect(jest.mocked(CharactersList, true).mock.calls[0][0].data).toEqual(
      adaptedCharactersMock,
    );
  });

  it('adapts data properly to characterData + 1 null item when query data = valid data', () => {
    jest.mocked(useQuery, true).mockReturnValue({
      loading: false,
      data: charactersMock,
      fetchMore: jest.fn(),
    } as any);
    jest.mocked(useCharactersStore, true).mockReturnValue({
      characterData: charactersMock.characters.results,
      nextPage: 2,
      updateData: jest.fn(),
    });
    render(<CharactersListController />);
    expect(jest.mocked(CharactersList, true).mock.calls[0][0].data).toEqual([
      ...adaptedCharactersMock,
      { character: null },
    ]);
  });

  it('adapts data properly to null when query data = null', () => {
    jest.mocked(useQuery, true).mockReturnValue({
      loading: true,
      data: null,
      fetchMore: jest.fn(),
    } as any);
    jest.mocked(useCharactersStore, true).mockReturnValue({
      characterData: null,
      nextPage: 1,
      updateData: jest.fn(),
    });
    render(<CharactersListController />);
    expect(jest.mocked(CharactersList, true).mock.calls[0][0].data).toBe(null);
  });
});
