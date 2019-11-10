import styled from 'styled-components';

import { Link } from 'react-router-dom';

export default {
  Intro: styled.div`
    font-size: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    text-align: center;
  `,
  Arrow: styled(Link)`
    width: 20%;
    font-size: 0.8em;
  `,
  MainContainer: styled.div`
    margin-top: 2em;
    width: 100%;
    display: flex;
  `,
  Pokemons: styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
  `,
  ErrorMessage: styled.p`
    margin: auto;
    color: red;
  `,
  Loader: styled.img`
    margin: auto;
    width: 200px;
    height: auto;
  `,
};
