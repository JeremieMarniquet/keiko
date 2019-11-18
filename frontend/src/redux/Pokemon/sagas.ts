import { takeEvery } from 'redux-saga/effects';

function* fetchPokemons(action: any) {
  console.log('I have been called!');
  yield 'hello';
}

export default function* pokemonSaga() {
  yield takeEvery('Pokemon/FETCH_POKEMONS_REQUESTED', fetchPokemons);
}
