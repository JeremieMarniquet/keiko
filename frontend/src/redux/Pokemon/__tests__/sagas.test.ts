import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { makeGetRequest } from 'services/networking/request';
import { PokemonType } from '../types';
import { fetchPokemonsSuccess, fetchPokemonsRequested, fetchPokemonRequested, fetchPokemonSuccess } from '../actions';
import { normalize } from '../normalizer';

import { fetchPokemons, fetchPokemon } from '../sagas';

const pokemons: PokemonType[] = [
  { id: 91, name: 'cloyster', height: 15, weight: 1325 },
  { id: 92, name: 'gastly', height: 13, weight: 1 },
  { id: 93, name: 'haunter', height: 16, weight: 1 },
  { id: 94, name: 'gengar', height: 15, weight: 405 },
  { id: 95, name: 'onix', height: 88, weight: 2100 },
  { id: 96, name: 'drowzee', height: 10, weight: 324 },
  { id: 97, name: 'hypno', height: 16, weight: 756 },
];

const pokemon: PokemonType = pokemons[0]
const { [pokemon.id]: normalizedPokemon } = normalize(pokemon);

const fetchPokemonsRequestedAction = fetchPokemonsRequested({});
const fetchPokemonRequestedAction = fetchPokemonRequested(pokemon.id);

describe('[Saga] Pokemon redux', () => {
  describe('fetchPokemons', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        await expectSaga(fetchPokemons, fetchPokemonsRequestedAction)
          .provide([[matchers.call.fn(makeGetRequest), { body: pokemons }]])
          .put(fetchPokemonsSuccess(normalize(pokemons)))
          .run();
      });
    });
  });

  describe('fetchPokemon', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        await expectSaga(fetchPokemon, fetchPokemonRequestedAction)
          .provide([[matchers.call.fn(makeGetRequest), { body: pokemon }]])
          .put(fetchPokemonSuccess(normalizedPokemon))
          .run();
      });
    });
  });
});