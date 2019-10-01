import React, { useState, useEffect } from 'react';
import Style from './Pokemon.style';
import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';

import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import Loader from '../../assets/loader.svg';

interface RouteParams {
  id: string;
}

interface State {
  loading: boolean;
  error: boolean;
  // pokemon is nullable in this case
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
  } | null;
}

var PokemonPage = (props: RouteComponentProps<RouteParams>) => {
  let defaultState: State = {
    loading: true,
    error: false,
    pokemon: null,
  };
  let [state, setState] = useState(defaultState);

  useEffect(() => {
    let effect = async () => {
      try {
        let response = await makeGetRequest(`/pokemon/${props.match.params.id}`);
        setState({
          loading: false,
          error: false,
          pokemon: response.body,
        });
      } catch (e) {
        setState({
          loading: false,
          error: true,
          pokemon: null,
        });
      }
    };
    effect();
  }, [props]);

  return (
    <Style.MainContainer>
      {state.loading ? (
        <Style.Loader src={Loader} alt="Loading..." />
      ) : state.error ? (
        <Style.ErrorMessage>
          <FormattedMessage id="error.loading" />
        </Style.ErrorMessage>
      ) : state.pokemon !== null ? (
        <Pokemon
          pokedexId={state.pokemon.id}
          name={state.pokemon.name}
          height={state.pokemon.height}
          weight={state.pokemon.weight}
        />
      ) : (
        // if error is set to false, loading to true and pokemon to null, then something is wrong
        <Style.ErrorMessage>
          <FormattedMessage id="error.serverError" />
        </Style.ErrorMessage>
      )}
    </Style.MainContainer>
  );
};

export default PokemonPage;
