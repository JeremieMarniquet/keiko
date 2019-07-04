import * as React from 'react';

interface Props {
  pokemon: { id: number; name: string };
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      this.props.pokemon.id
    }.png`;

    return (
      <>
        <div>{this.props.pokemon.id}</div>
        <div>{this.props.pokemon.name}</div>
        <img src={url} width="50" height="50" />
      </>
    );
  }
}

export default Pokemon;
