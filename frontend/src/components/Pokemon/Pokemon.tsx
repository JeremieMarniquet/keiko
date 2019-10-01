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
  const [showsBack, setShowsBack] = useState(false);
  let imageUrl: string = showsBack
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${props.pokedexId}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokedexId}.png`;
  return (
    <Style.Pokemon onClick={() => setShowsBack(!showsBack)}>
      <p>{props.name}</p>
      <img src={imageUrl} alt={props.name} />
      <p>
        <FormattedMessage id="pokemon.id" /> : {props.pokedexId}
      </p>
      <p>
        <FormattedMessage id="pokemon.weight" /> : {props.weight}kg
      </p>
      <p>
        <FormattedMessage id="pokemon.height" /> : {props.height}cm
      </p>
    </Style.Pokemon>
  );
};

// class Pokemon extends React.Component<Props> {
//   render(): React.ReactNode {
//     const imageURl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.pokedexId}.png`;
//     return (
//     );
//   }
// }

export default Pokemon;
