import React from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon';

import { FormattedMessage } from 'react-intl';

import { PokemonState } from 'redux/Pokemon';
export interface Props {
  // component data
  pokemons: PokemonState;
  // route parameters
  match: any;
  fetchPokemonsRequested: (page: String) => void;
}

var Home = (props: Props) => {
  // Retrieve the pokemon as props
  const { pokemons } = props;

  // If the page is retrieved as the index page (with the "/" route),
  // or if the page url parameter is invalid (not a number) -> default to 1
  let page = parseInt(props.match.params.page) || 1;

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
        <Style.Pokemons>
          {Object.values(pokemons).map(pokemon => {
            return (
              <Pokemon
                key={pokemon.id}
                pokedexId={pokemon.id}
                name={pokemon.name}
                // Convert from decimeters to centimeters
                height={pokemon.height * 10}
                weight={pokemon.weight}
              />
            );
          })}
        </Style.Pokemons>
      </Style.MainContainer>
    </>
  );
};

export default Home;
