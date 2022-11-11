import create from 'zustand';
import { Character } from './types';

export interface Store {
  characterData: null | Character[];
  nextPage: number | null;
  updateData: (data: Character[] | null, next: number) => void;
}

export const useCharactersStore = create<Store>((set) => ({
  characterData: null,
  nextPage: 1,
  updateData: (data, next) =>
    set((state) => {
      return {
        characterData: [...(state?.characterData ?? []), ...(data ?? [])],
        nextPage: next,
      };
    }),
}));
