import styled from 'styled-components';

export default {
  Intro: styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
  `,
};

export const Title = styled.div`
  font-family: 'Pokemon';
  font-size: 20px;
  margin: 20px;
`;

export const Pokedex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
