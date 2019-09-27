import * as React from 'react';

import Style from './Home.style';
import Pokemon from 'components/Pokemon';

class Home extends React.Component {
  render(): React.ReactNode {
    return (
      <Style.Intro>
        <div>Bienvenue sur ton futur pokédex !</div>
        <div>
          Tu vas pouvoir apprendre tout ce qu'il faut sur React, Redux et Symfony, et attraper des
          pokemons !
        </div>
        <div>Commence par créer ton premier pokemon: Carapuce</div>
        <Pokemon name="Carapuce" pokedexId={7} />
        <Pokemon name="Salamèche" pokedexId={4} />
        <Pokemon name="Bulbizarre" pokedexId={1} />
      </Style.Intro>
    );
  }
}

export default Home;
