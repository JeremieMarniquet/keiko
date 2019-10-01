import styled from 'styled-components';

export default {
  Pokemon: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em 1em 2em;
    margin: 0.5em;
    border: 2px solid black;
    outline: 2px solid black;
    outline-offset: 1px;
    font-size: 0.8em;
    width: 15%;

    /* Responsive display */
    @media screen and (max-width: 1200px) {
      width: 25%;
    }
    @media screen and (max-width: 700px) {
      width: 40%;
    }
  `,
};
