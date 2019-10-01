import styled from 'styled-components';

export default {
  Intro: styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
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
  Loader: styled.img`
    margin: auto;
    width: 200px;
    height: auto;
  `,
};
