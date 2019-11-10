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
  // Default state
  let defaultState: State = {
    loading: true,
    error: false,
    pokemons: [],
  };
  let [state, setState] = useState(defaultState);

  // If the page is retrieved as the index page (with the "/" route),
  // or if the page url parameter is invalid (not a number) -> default to 1
  let page = parseInt(props.match.params.page) || 1;

  // // Update the page number, and reset the component in a "loading" state so that
  // // it fetches the new page.
  useEffect(() => {
    setState(defaultState);
    // eslint-disable-next-line
  }, [page]);

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
        <Style.Arrow to={`/pokedex/${page - 1}`}>
          {page !== 1 && <FormattedMessage id="home.previous-page" />}
        </Style.Arrow>
        <p>
          <FormattedMessage id="home.welcome-message" />
        </p>
        <Style.Arrow to={`/pokedex/${page + 1}`}>
          {page !== 6 && <FormattedMessage id="home.next-page" />}
        </Style.Arrow>
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
