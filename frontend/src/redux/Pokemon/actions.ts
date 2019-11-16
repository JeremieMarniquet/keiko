import { createStandardAction } from 'typesafe-actions';
import { PokemonState } from './types';

export const fetchPokemonsSuccess = createStandardAction('Pokemon/FETCH_SUCCESS')<{
  pokemons: PokemonState;
}>();

export default {
  fetchPokemonsSuccess,
};
