import withDataFetching from '../../HOC/WithDataFetching';
import { makeGetRequest } from 'services/networking/request';
import Home, { Props } from './Home';

export default withDataFetching<Props>(
  'pokemons',
  (props: Props) => makeGetRequest(`/pokemon?page=${props.match.params.page || 1}`),
  (props: Props) => [props.match.params.page],
)(Home);
