import * as React from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon/Pokemon';
import { makeGetRequest } from 'services/networking/request';

interface PropsType {}

interface StateType {
  pokemons: { id: number; name: string }[];
}

class Home extends React.Component<PropsType, StateType> {
  state: StateType = {
    pokemons: [],
  };

  render(): React.ReactNode {
    if (this.state.pokemons.length !== 0) {
      const pokemon = this.state.pokemons[0];

      return (
        <Style.Intro>
          <div>Pokédex :</div>
          <Pokemon pokemon={pokemon} />
        </Style.Intro>
      );
    }

    return (
      <Style.Intro>
        <div>Pokédex :</div>
      </Style.Intro>
    );
  }

  componentDidMount() {
    makeGetRequest('/pokemon/').then(response => {
      this.setState({ pokemons: response.body });
    });
  }
}

export default Home;
