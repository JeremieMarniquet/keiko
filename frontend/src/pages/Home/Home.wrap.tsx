import withDataFetching from '../../HOC/WithDataFetching';
import { makeGetRequest } from 'services/networking/request';
import { fetchPokemonsSuccess } from 'redux/Pokemon';
import { fetchPokemonsRequested } from 'redux/Pokemon';
import Home, { Props } from './Home';
import { connect } from 'react-redux';

import { RootState } from 'redux/types';

const fetchingComponent = withDataFetching<Props>(
  'pokemons',
  (props: Props) => {
    props.fetchPokemonsRequested('1');
    return makeGetRequest(`/pokemon?page=${props.match.params.page || 1}`);
  },
  (props: Props) => [props.match.params.page],
  (props: Props, data: any) => {
    props.fetchPokemonsSuccess(data);
  },
)(Home);

const mapStateToProps = (state: RootState) => {
  const { pokemon } = state;
  return { pokemons: pokemon };
};

const mapDispatchToProps = {
  fetchPokemonsSuccess,
  fetchPokemonsRequested,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(fetchingComponent);
