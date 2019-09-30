import * as React from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';

import { FormattedMessage } from 'react-intl';
import { createGlobalStyle } from 'styled-components';

interface Props {}
interface State {
  pokemons: {
    id: number;
    name: string;
    height: number;
    weight: number;
  }[];
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pokemon GB';
    src: url('../public/pokemon.ttf') format('ttf')
  }
  body {
    font-family: 'Pokemon GB' 'sans-serif';
  }
`;

class Home extends React.Component<Props, State> {
  readonly state: State = {
    pokemons: [],
  };

  render(): React.ReactNode {
    return (
      <>
        <GlobalStyle />
        <Style.Intro>
          <p>
            <FormattedMessage id="home.welcome-message" />
          </p>
        </Style.Intro>
        <Style.Pokemons>
          {this.state.pokemons.map(function(pokemon, index) {
            return (
              <Pokemon
                key={index}
                pokedexId={pokemon.id}
                name={pokemon.name}
                // Convert from decimeters to centimeters
                height={pokemon.height * 10}
                weight={pokemon.weight}
              />
            );
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
