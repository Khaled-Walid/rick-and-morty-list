import { CharactersList } from '../../components/CharactersList';
import { useQuery } from '@apollo/client';
import { getCharactersQuery } from '../../data/query';
import { useCharactersStore } from '../../data/store';
import { useEffect, useMemo } from 'react';
import { CharacterCardProps } from '../../components/CharacterCard/CharacterCard';
import { Characters } from '../../data/types';

export const CharactersListController = (): JSX.Element => {
  const {
    characterData: charactersSlice,
    nextPage: nextPageSlice,
    updateData,
  } = useCharactersStore();

  const { loading, error, fetchMore, data } = useQuery<Characters>(
    getCharactersQuery,
    {
      variables: { page: 1 },
    },
  );

  useEffect(() => {
    if (!loading && error == null && data != null) {
      updateData(data.characters.results, data.characters.info.next);
    }
  }, [loading, error]);

  const adapted: CharacterCardProps[] | null | undefined = useMemo(() => {
    if (charactersSlice == null) return null;

    const loadedData: CharacterCardProps[] = charactersSlice.map((e) => {
      return {
        character: {
          image: e.image,
          name: e.name,
          status: e.status,
          species: e.species,
          gender: e.gender,
          location: e.location.name,
          firstEpisode: e.episode[0].name,
        },
      };
    });
    if (nextPageSlice !== null) {
      loadedData.push({ character: null });
    }

    return loadedData;
  }, [charactersSlice]);

  const isItemLoaded: (index: number) => boolean = (index) => {
    if (adapted == null) return false;
    return !(adapted[index]?.character == null);
  };

  const loadMoreItems: (
    startIndex: number,
    stopIndex: number,
  ) => Promise<void> | void = async () => {
    const { error, data } = await fetchMore({
      variables: {
        page: nextPageSlice,
      },
    });
    if (error == null) {
      updateData(data.characters.results, data.characters.info.next);
    }
  };
  return (
    <CharactersList
      data={adapted}
      isItemLoaded={isItemLoaded}
      loadMoreItems={loadMoreItems}
    />
  );
};
