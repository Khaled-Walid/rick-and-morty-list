import create from 'zustand';
import { Character } from '../controllers/CharactersListController/CharactersListController';

export interface Store {
  characterData: null | Character[];
  nextPage: number;
  updateData: (data: Character[] | null, next: number) => void;
}

export const useCharactersStore = create<Store>((set) => ({
  characterData: null,
  nextPage: 1,
  updateData: (data, next) =>
    set((state) => {
      const newState: Store = {
        ...state,
        characterData: [...(state?.characterData ?? []), ...(data ?? [])],
        nextPage: next,
      };
      return newState;
    }),
}));
