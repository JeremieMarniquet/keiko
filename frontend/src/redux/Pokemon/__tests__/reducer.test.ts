import { fetchPokemonsSuccess, fetchPokemonSuccess } from '../actions';
import { PokemonState, PokemonType } from '../types';
import reducer from '../reducer';

const pokemons: PokemonState = {
  91: { id: 91, name: 'cloyster', height: 15, weight: 1325 },
  92: { id: 92, name: 'gastly', height: 13, weight: 1 },
  93: { id: 93, name: 'haunter', height: 16, weight: 1 },
  94: { id: 94, name: 'gengar', height: 15, weight: 405 },
  95: { id: 95, name: 'onix', height: 88, weight: 2100 },
  96: { id: 96, name: 'drowzee', height: 10, weight: 324 },
  97: { id: 97, name: 'hypno', height: 16, weight: 756 },
};
const pokemon: PokemonType = { id: 97, name: 'hypno', height: 16, weight: 756 };
const initialState = {};

describe('Pokemons reducer', () => {
  describe('FETCH_SUCCESS case', () => {
    it('Should return an initial state with an object containing pokemons in the pokemons field', () => {
      const action = fetchPokemonsSuccess({ pokemons });
      const expectedState = { ...initialState, pokemons };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('FETCH_POKEMON_SUCCESS case', () => {
    it('Should return an initial state with a unique pokemon in the pokemons field', () => {
      const action = fetchPokemonSuccess(pokemon);
      const expectedState = { ...initialState, [pokemon.id]: pokemon };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
