import * as React from 'react';
import styled from 'styled-components';
import { Box, BoxContainer, TextBox } from './Pokemon.style';

interface Props {
  pokemon: { id: number; name: string; weight: number; height: number };
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      this.props.pokemon.id
    }.png`;

    return (
      <>
        <BoxContainer>
          <Box>
            <TextBox>{this.props.pokemon.name}</TextBox>
            <img src={url} width="80" height="80" />
            <TextBox>
              <div>Id: {this.props.pokemon.id}</div>
              <div>Weight: {this.props.pokemon.weight / 10} kg</div>
              <div>Height: {this.props.pokemon.height * 10} cm</div>
            </TextBox>
          </Box>
        </BoxContainer>
      </>
    );
  }
}

export default Pokemon;
