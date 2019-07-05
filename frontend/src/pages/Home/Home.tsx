import * as React from 'react';

import Style from './Home.style';
import { Title, Pokedex } from './Home.style';
import Pokemon from 'components/Pokemon/Pokemon';
import { makeGetRequest } from 'services/networking/request';
import { GlobalStyle } from './Global.style';

interface PropsType {}

interface StateType {
  pokemons: { id: number; name: string; weight: number; height: number }[];
  loading: boolean;
}

class Home extends React.Component<PropsType, StateType> {
  state: StateType = {
    pokemons: [],
    loading: false,
  };

  render(): React.ReactNode {
    const { pokemons, loading } = this.state;

    return (
      <Style.Intro>
        <GlobalStyle />
        <Title>Pokédex :</Title>
        <Pokedex>
          {loading ? (
            <img src={'loader.svg'} width="100" height="100" />
          ) : (
            this.state.pokemons.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)
          )}
        </Pokedex>
      </Style.Intro>
    );
  }

  componentDidMount() {
    this.setState({ loading: true });
    makeGetRequest('/pokemon/').then(response => {
      this.setState({ pokemons: response.body, loading: false });
    });
  }
}

export default Home;
