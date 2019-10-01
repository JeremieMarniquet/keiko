import React, { useState, useEffect } from 'react';
import Style from './Pokemon.style';
import { makeGetRequest } from 'services/networking/request';

import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import Loader from '../../assets/loader.svg';

import { Link } from 'react-router-dom';

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

const getImageUrl = (id: number, back: boolean, shiny: boolean): string => {
  let baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  if (back) {
    baseUrl += '/back';
  }
  if (shiny) {
    baseUrl += '/shiny';
  }
  return baseUrl + `/${id}.png`;
};

const PokemonPage = (props: RouteComponentProps<RouteParams>) => {
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
        <Style.PokemonContainer>
          <p>{state.pokemon.name}</p>
          <Style.PokemonImagesContainer>
            <img src={getImageUrl(state.pokemon.id, false, false)} alt={state.pokemon.name} />
            <img src={getImageUrl(state.pokemon.id, true, false)} alt={state.pokemon.name} />
            <img src={getImageUrl(state.pokemon.id, false, true)} alt={state.pokemon.name} />
            <img src={getImageUrl(state.pokemon.id, true, true)} alt={state.pokemon.name} />
          </Style.PokemonImagesContainer>
          <p>
            <FormattedMessage id="pokemon.id" /> : {state.pokemon.id}
          </p>
          <p>
            <FormattedMessage id="pokemon.weight" /> : {state.pokemon.weight}kg
          </p>
          <p>
            <FormattedMessage id="pokemon.height" /> : {state.pokemon.height}cm
          </p>
        </Style.PokemonContainer>
      ) : (
        // if error is set to false, loading to true and pokemon to null, then something is wrong
        <Style.ErrorMessage>
          <FormattedMessage id="error.serverError" />
        </Style.ErrorMessage>
      )}
      <Link to="/">
        <FormattedMessage id="page.back" />
      </Link>
    </Style.MainContainer>
  );
};

export default PokemonPage;
