import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPokemonsSuccess } from './actions';
import { makeGetRequest } from 'services/networking/request';
import { normalize } from './normalizer';

export function* fetchPokemons({ type, payload: page }: { type: string; payload: string }) {
  const { body: pokemons } = yield call(makeGetRequest, `/pokemon?page=${page}`);
  const normalizedPokemons = normalize(pokemons);
  yield put(fetchPokemonsSuccess(normalizedPokemons));
}

export default function* pokemonSagas() {
  yield takeEvery('Pokemon/FETCH_POKEMONS_REQUESTED', fetchPokemons);
}
