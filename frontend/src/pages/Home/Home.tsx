import * as React from 'react';

import Style from './Home.style';

class Home extends React.Component {
  render(): React.ReactNode {
    const pokemon = {
      name: 'Carapuce',
      pokedexNumber: 7,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    };

    return (
      <Style.Intro>
        <div>Bienvenue sur ton futur pokédex !</div>
        <div>
          Tu vas pouvoir apprendre tout ce qu'il faut sur React, Redux et Symfony, et attraper des
          pokemons !
        </div>
        <div>Commence par créer ton premier pokemon: {pokemon.name}</div>
        <Style.pokemon>
          <p>{pokemon.name}</p>
          <p>{pokemon.pokedexNumber}</p>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
        </Style.pokemon>
      </Style.Intro>
    );
  }
}

export default Home;
