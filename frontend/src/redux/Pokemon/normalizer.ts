import { PokemonType, PokemonState } from './types';

export const normalize = (pokemons: PokemonType[] | PokemonType): PokemonState => {
  if (pokemons instanceof Array) {
    return pokemons.reduce(
      (newPokemons: PokemonState, pokemon) => ({
        ...newPokemons,
        [pokemon.id]: pokemon,
      }),
      {},
    );
  } else {
    return { [pokemons.id]: pokemons };
  }
};
