import { normalize } from '../normalizer';
import { PokemonState, PokemonType } from '../types';

const pokemonsPayload: PokemonType[] = [
  { id: 91, name: 'cloyster', height: 15, weight: 1325 },
  { id: 92, name: 'gastly', height: 13, weight: 1 },
  { id: 93, name: 'haunter', height: 16, weight: 1 },
  { id: 94, name: 'gengar', height: 15, weight: 405 },
  { id: 95, name: 'onix', height: 88, weight: 2100 },
  { id: 96, name: 'drowzee', height: 10, weight: 324 },
  { id: 97, name: 'hypno', height: 16, weight: 756 },
];

const expectedPokemons: PokemonState = {
  91: { id: 91, name: 'cloyster', height: 15, weight: 1325 },
  92: { id: 92, name: 'gastly', height: 13, weight: 1 },
  93: { id: 93, name: 'haunter', height: 16, weight: 1 },
  94: { id: 94, name: 'gengar', height: 15, weight: 405 },
  95: { id: 95, name: 'onix', height: 88, weight: 2100 },
  96: { id: 96, name: 'drowzee', height: 10, weight: 324 },
  97: { id: 97, name: 'hypno', height: 16, weight: 756 },
};

const pokemon: PokemonType = { id: 97, name: 'hypno', height: 16, weight: 756 };

describe('Pokemons normalize', () => {
  it('Should turn a list of pokemons into an object wich keys are the ids', () => {
    expect(normalize(pokemonsPayload)).toEqual(expectedPokemons);
  });

  it('Should not modify a payload with only one pokemon', () => {
    expect(normalize(pokemon)).toEqual({ [pokemon.id]: pokemon });
  });
});
