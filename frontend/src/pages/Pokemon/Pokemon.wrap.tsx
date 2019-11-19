import withDataFetching from '../../HOC/WithDataFetching';
import Pokemon, { Props } from './Pokemon';
import { getPokemon } from 'redux/Pokemon/selectors';
import { fetchPokemonRequested } from 'redux/Pokemon';
import { RootState } from 'redux/types';
import { connect } from 'react-redux';

const fetchingComponent = withDataFetching<Props>(
  'pokemons',
  (props: Props) => {
    props.fetchPokemonRequested(props.match.params.id);
  },
  (props: Props) => [],
)(Pokemon);

const mapStateToProps = (state: RootState, props: Props) => ({
  pokemon: getPokemon(state, props.match.params.id),
});

const mapDispatchToProps = {
  fetchPokemonRequested,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(fetchingComponent);
