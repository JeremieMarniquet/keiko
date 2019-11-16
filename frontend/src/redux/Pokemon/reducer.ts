import { AnyAction } from 'redux';
import { PokemonState } from './types';
import { normalize } from './normalizer';

const initialState: PokemonState = {};

const reducer = (state: PokemonState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'Pokemon/FETCH_SUCCESS':
      return {
        ...state,
        ...normalize(action.payload),
      };

    case 'Pokemon/FETCH_ONE_SUCCESS':
      return {
        ...state,
        [action.pokemon.id]: action.pokemon,
      };

    default:
      return state;
  }
};

export default reducer;
