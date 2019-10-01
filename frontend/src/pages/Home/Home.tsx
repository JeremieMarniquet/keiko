import * as React from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';

import { FormattedMessage } from 'react-intl';
import Loader from '../../assets/loader.svg';

interface Props {}
interface State {
  loading: boolean;
  error: boolean;
  pokemons: {
    id: number;
    name: string;
    height: number;
    weight: number;
  }[];
}

class Home extends React.Component<Props, State> {
  state: State = {
    loading: true,
    error: false,
    pokemons: [],
  };

  render(): React.ReactNode {
    return (
      <>
        <Style.Intro>
          <p>
            <FormattedMessage id="home.welcome-message" />
          </p>
        </Style.Intro>
        <Style.MainContainer>
          {this.state.loading ? (
            <Style.Loader src={Loader} alt="Loading..." />
          ) : this.state.error ? (
            <Style.ErrorMessage>
              <FormattedMessage id="error.loading" />
            </Style.ErrorMessage>
          ) : (
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
          )}
        </Style.MainContainer>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    let component: Home = this;
    try {
      let response = await makeGetRequest('/pokemon');
      component.setState({
        loading: false,
        error: false,
        pokemons: response.body,
      });
    } catch (e) {
      component.setState({
        loading: false,
        error: true,
        pokemons: [],
      });
    }
  }
}

export default Home;
