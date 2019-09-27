import * as React from 'react';

import Style from './Pokemon.style';

interface Props {
  name: string;
  pokedexId: number;
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    const imageURl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.pokedexId}.png`;
    return (
      <Style.Pokemon>
        <p>{this.props.name}</p>
        <p>{this.props.pokedexId}</p>
        <img src={imageURl} alt={this.props.name} />
      </Style.Pokemon>
    );
  }
}

export default Pokemon;
