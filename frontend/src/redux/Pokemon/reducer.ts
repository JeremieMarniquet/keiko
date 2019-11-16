import { AnyAction } from 'redux';
import { PokemonState } from './types';

const initialState: PokemonState = {};

const reducer = (state: PokemonState = initialState, action: AnyAction) => {
  return state;
};

export default reducer;
