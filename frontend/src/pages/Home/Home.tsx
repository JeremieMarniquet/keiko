import React, { useState, useEffect } from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';

import { FormattedMessage } from 'react-intl';
import Loader from '../../assets/loader.svg';

interface Props {
  match: any;
}
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

var Home = (props: Props) => {
  // Retrieve the page or set a default value if the component is called from '/'
  let page = props.match.params.page ? props.match.params.page : 1;

  // Default state
  let defaultState: State = {
    loading: true,
    error: false,
    pokemons: [],
  };
  let [state, setState] = useState(defaultState);

  useEffect(() => {
    if (state.loading) {
      let effect = async () => {
        try {
          let response = await makeGetRequest(`/pokemon?page=${page}`);
          setState({
            loading: false,
            error: false,
            pokemons: response.body,
          });
        } catch (e) {
          setState({
            loading: false,
            error: true,
            pokemons: [],
          });
        }
      };
      effect();
    }
  }, [state.loading, page]);

  return (
    <>
      <Style.Intro>
        <p>
          <FormattedMessage id="home.welcome-message" />
        </p>
      </Style.Intro>
      <Style.MainContainer>
        {state.loading ? (
          <Style.Loader src={Loader} alt="Loading..." />
        ) : state.error ? (
          <Style.ErrorMessage>
            <FormattedMessage id="error.loading" />
          </Style.ErrorMessage>
        ) : (
          <Style.Pokemons>
            {state.pokemons.map(function(pokemon, index) {
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
};

export default Home;
