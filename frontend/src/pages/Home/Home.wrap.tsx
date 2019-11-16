// import withDataFetching from '../../HOC/WithDataFetching';
import { makeGetRequest } from 'services/networking/request';
import Home, { Props } from './Home';
import { connect } from 'react-redux';

import { RootState } from 'redux/types';

// This will be useful later
// const fetchingComponent = withDataFetching<Props>(
//   'pokemons',
//   (props: Props) => makeGetRequest(`/pokemon?page=${props.match.params.page || 1}`),
//   (props: Props) => [props.match.params.page],
// )(Home);

const mapStateToProps = (state: RootState) => {
  const { pokemon } = state;
  return { pokemons: pokemon };
};

export default connect(mapStateToProps)(Home);
