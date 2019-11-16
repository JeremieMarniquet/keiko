export interface PokemonType {
  name: string;
  id: number;
  weight: number;
  height: number;
}

export type PokemonState = Readonly<Record<string, PokemonType>>;
