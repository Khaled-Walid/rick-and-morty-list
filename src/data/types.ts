export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  location: {
    name: string;
  };
  episode: Array<{ name: string }>;
}

export interface Characters {
  characters: {
    info: {
      next: number;
    };
    results: Character[];
  };
}
