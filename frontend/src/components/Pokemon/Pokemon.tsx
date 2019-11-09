import React, { useState } from 'react';

import Style from './Pokemon.style';
import { FormattedMessage } from 'react-intl';

interface Props {
  name: string;
  pokedexId: number;
  weight: number;
  height: number;
}

var Pokemon = (props: Props) => {
  const [isTurned, setIsTurned] = useState(false);
  let imageUrl: string = isTurned
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${props.pokedexId}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokedexId}.png`;

  return (
    <Style.PokemonCard to={`/pokemon/${props.pokedexId}`}>
      <p>{props.name}</p>
      <img
        src={imageUrl}
        alt={props.name}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          setIsTurned(!isTurned);
        }}
      />
      <p>
        <FormattedMessage id="pokemon.id" /> : {props.pokedexId}
      </p>
      <p>
        <FormattedMessage id="pokemon.weight" /> : {props.weight}kg
      </p>
      <p>
        <FormattedMessage id="pokemon.height" /> : {props.height}cm
      </p>
    </Style.PokemonCard>
  );
};

export default Pokemon;
