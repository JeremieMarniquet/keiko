import * as React from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';

interface Props {}
interface State {
  pokemons: {
    id: number;
    name: string;
  }[];
}

class Home extends React.Component<Props, State> {
  readonly state: State = {
    pokemons: [],
  };

  render(): React.ReactNode {
    return (
      <>
        <Style.Intro>
          <div>Bienvenue sur mon pokédex !</div>
        </Style.Intro>
        <Style.Pokemons>
          {this.state.pokemons.map(function(pokemon, index) {
            return <Pokemon key={index} pokedexId={pokemon.id} name={pokemon.name} />;
          })}
        </Style.Pokemons>
      </>
    );
  }

  componentDidMount(): void {
    let component: Home = this;
    makeGetRequest('/pokemon').then(function(response) {
      component.setState({
        pokemons: response.body,
      });
    });
  }
}

export default Home;
