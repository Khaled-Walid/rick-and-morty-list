import { CharacterCardProps } from '../components/CharacterCard/CharacterCard';

export const adaptedCharactersMock: CharacterCardProps[] = [
  {
    character: {
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      location: 'Citadel of Ricks',
      firstEpisode: 'Pilot',
    },
  },
  {
    character: {
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      location: 'Citadel of Ricks',
      firstEpisode: 'Pilot',
    },
  },
  {
    character: {
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      name: 'Summer Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Female',
      location: 'Earth (Replacement Dimension)',
      firstEpisode: 'Rick Potion #9',
    },
  },
];
