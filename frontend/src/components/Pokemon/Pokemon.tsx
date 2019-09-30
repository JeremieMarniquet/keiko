import * as React from 'react';

import Style from './Pokemon.style';
import { FormattedMessage } from 'react-intl';

interface Props {
  name: string;
  pokedexId: number;
  weight: number;
  height: number;
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    const imageURl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.pokedexId}.png`;
    return (
      <Style.Pokemon>
        <p>{this.props.name}</p>
        <img src={imageURl} alt={this.props.name} />
        <p>
          <FormattedMessage id="pokemon.id" /> : {this.props.pokedexId}
        </p>
        <p>
          <FormattedMessage id="pokemon.weight" /> : {this.props.weight}kg
        </p>
        <p>
          <FormattedMessage id="pokemon.height" /> : {this.props.height}cm
        </p>
      </Style.Pokemon>
    );
  }
}

export default Pokemon;
