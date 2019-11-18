import { createStandardAction } from 'typesafe-actions';
import { PokemonType, PokemonState } from './types';

export const fetchPokemonsSuccess = createStandardAction('Pokemon/FETCH_SUCCESS')<{
  pokemons: PokemonState;
}>();

export const fetchPokemonsRequested = createStandardAction(
  'Pokemon/FETCH_POKEMONS_REQUESTED',
)<{}>();

export const fetchPokemonSuccess = (pokemon: PokemonType) => ({
  type: 'Pokemon/FETCH_ONE_SUCCESS',
  pokemon,
});

export default {
  fetchPokemonsSuccess,
  fetchPokemonSuccess,
};
