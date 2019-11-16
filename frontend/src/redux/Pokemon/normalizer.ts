import { PokemonType, PokemonState } from './types';

export const normalize = (pokemons: PokemonType[]): PokemonState =>
  pokemons.reduce(
    (newPokemons: PokemonState, pokemon) => ({
      ...newPokemons,
      [pokemon.id]: pokemon,
    }),
    {},
  );
