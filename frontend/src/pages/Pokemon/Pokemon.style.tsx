import styled from 'styled-components';

export default {
  MainContainer: styled.div`
    margin-top: 2em;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ErrorMessage: styled.p`
    color: red;
  `,
  Loader: styled.img`
    width: 200px;
    height: auto;
  `,
  PokemonContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em 1em 2em;
    margin: 0.5em 0.5em 2em 0.5em;
    border: 2px solid black;
    outline: 2px solid black;
    outline-offset: 1px;
    font-size: 0.8em;
    text-decoration: none;
    color: black;
  `,
  PokemonImagesContainer: styled.div`
    max-width: calc(96px * 2);
    display: flex;
    flex-flow: row wrap;
  `,
};
