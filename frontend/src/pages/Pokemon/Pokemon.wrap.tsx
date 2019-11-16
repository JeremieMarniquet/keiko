import withDataFetching from '../../HOC/WithDataFetching';
import { makeGetRequest } from 'services/networking/request';
import Pokemon, { Props } from './Pokemon';
import { PokemonType } from 'redux/Pokemon';
import { getPokemon } from 'redux/Pokemon/selectors';
import { fetchPokemonSuccess } from 'redux/Pokemon';
import { RootState } from 'redux/types';
import { connect } from 'react-redux';

const fetchingComponent = withDataFetching<Props>(
  'pokemon',
  (props: Props) => makeGetRequest(`/pokemon/${props.match.params.id}`),
  (props: Props) => [],
  // This will be changed
  (props: Props, data: PokemonType) => {
    props.fetchPokemonSuccess(data);
  },
)(Pokemon);

const mapStateToProps = (state: RootState, props: Props) => ({
  pokemon: getPokemon(state, props.match.params.id),
});

const mapDispatchToProps = {
  fetchPokemonSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(fetchingComponent);
