import { AnyAction } from 'redux';
import { PokemonState } from './types';

const initialState: PokemonState = {};

const reducer = (state: PokemonState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'Pokemon/FETCH_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
