import * as React from 'react';

import Style from './Home.style';
import { Title, Pokedex } from './Home.style';
import Pokemon from 'components/Pokemon/Pokemon';
import { makeGetRequest } from 'services/networking/request';
import { GlobalStyle } from './Global.style';

interface PropsType {}

interface StateType {
  pokemons: { id: number; name: string; weight: number; height: number }[];
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
          <GlobalStyle />
          <Title>Pokédex :</Title>
          <Pokedex>
            {this.state.pokemons.map(pokemon => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </Pokedex>
        </Style.Intro>
      );
    }

    return (
      <Style.Intro>
        <GlobalStyle />
        <Title>Pokédex :</Title>
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
