import * as React from 'react';

import Style from './Home.style';
import Pokemon from "components/Pokemon/Pokemon";

class Home extends React.Component {
  render(): React.ReactNode {

    return (
      <Style.Intro>
          <div>Pokédex :</div>
          <Pokemon name="Carapuce" id={7}/>
          <Pokemon name="Carabaffe" id={8}/>
          <Pokemon name="Tortank" id={9}/>
      </Style.Intro>
    );
  }
}

export default Home;
