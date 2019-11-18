import { all } from 'redux-saga/effects';

import { sagas as loginSagas } from 'redux/Login';
import { sagas as pokemonSagas } from 'redux/Pokemon';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([loginSagas(), pokemonSagas()]);
}
