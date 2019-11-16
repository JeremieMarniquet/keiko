import { PokemonType } from './types';
import { RootState } from '../types';

export const getPokemon = (state: RootState, id: string): PokemonType => state.pokemon[id];
