import withDataFetching from '../../HOC/WithDataFetching';
import { fetchPokemonsRequested } from 'redux/Pokemon';
import Home, { Props } from './Home';
import { connect } from 'react-redux';

import { RootState } from 'redux/types';

const fetchingComponent = withDataFetching<Props>(
  'pokemons',
  (props: Props) => {
    props.fetchPokemonsRequested(props.match.params.page);
  },
  (props: Props) => [props.match.params.page],
)(Home);

const mapStateToProps = (state: RootState) => {
  const { pokemon } = state;
  return { pokemons: pokemon };
};

const mapDispatchToProps = {
  fetchPokemonsRequested,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(fetchingComponent);
