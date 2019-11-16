import { LoginAction, LoginState } from './Login';
import { PokemonState } from './Pokemon';

export type RootState = Readonly<{
  login: LoginState;
  pokemon: PokemonState;
}>;
export type RootAction = LoginAction;
