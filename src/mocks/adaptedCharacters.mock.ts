import {
  CharacterCardData,
  CharacterCardProps,
} from '../components/CharacterCard/CharacterCard';

export const adaptedSingleCharacterMock: CharacterCardData = {
  name: 'Rick Sanchez 1',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  location: 'somewhere',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  firstEpisode: 'some Episode',
};

export const adaptedCharactersMock: CharacterCardProps[] = Array.from(
  Array(20),
).map((x) => ({
  character: adaptedSingleCharacterMock,
}));
