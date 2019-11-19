import React from 'react';
import Style from './Pokemon.style';

import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';

import { PokemonType } from 'redux/Pokemon/types';

export interface Props {
  pokemon: PokemonType;
  fetchPokemonRequested: (page: String) => void;
  match: any;
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

const PokemonPage = (props: Props) => {
  let pokemon = props.pokemon;

  if (pokemon) {
    return (
      <Style.MainContainer>
        <Style.PokemonContainer>
          <p>{pokemon.name}</p>
          <Style.PokemonImagesContainer>
            <img src={getImageUrl(pokemon.id, false, false)} alt={pokemon.name} />
            <img src={getImageUrl(pokemon.id, true, false)} alt={pokemon.name} />
            <img src={getImageUrl(pokemon.id, false, true)} alt={pokemon.name} />
            <img src={getImageUrl(pokemon.id, true, true)} alt={pokemon.name} />
          </Style.PokemonImagesContainer>
          <p>
            <FormattedMessage id="pokemon.id" /> : {pokemon.id}
          </p>
          <p>
            <FormattedMessage id="pokemon.weight" /> : {pokemon.weight}kg
          </p>
          <p>
            <FormattedMessage id="pokemon.height" /> : {pokemon.height}cm
          </p>
        </Style.PokemonContainer>
        <Link to="/">
          <FormattedMessage id="page.back" />
        </Link>
      </Style.MainContainer>
    );
  } else {
    return <Style.MainContainer></Style.MainContainer>;
  }
};

export default PokemonPage;
