import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPokemonsSuccess, fetchPokemonSuccess } from './actions';
import { makeGetRequest } from 'services/networking/request';
import { normalize } from './normalizer';

export function* fetchPokemons({ type, payload: page }: { type: string; payload: string }) {
  const { body: pokemons } = yield call(makeGetRequest, `/pokemon?page=${page}`);
  const normalizedPokemons = normalize(pokemons);
  yield put(fetchPokemonsSuccess(normalizedPokemons));
}

export function* fetchPokemon({ type, payload: id }: { type: string; payload: string }) {
  const { body: pokemon } = yield call(makeGetRequest, `/pokemon/${id}`);
  const { [id]: normalizedPokemon } = normalize(pokemon);
  yield put(fetchPokemonSuccess(normalizedPokemon));
}

export default function* pokemonSagas() {
  yield takeEvery('Pokemon/FETCH_POKEMONS_REQUESTED', fetchPokemons);
  yield takeEvery('Pokemon/FETCH_POKEMON_REQUESTED', fetchPokemon);
}
