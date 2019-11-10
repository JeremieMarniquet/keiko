import React, { useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import Loader from '../../assets/loader.svg';

import Style from './withDataFetching.style';

const withDataFetching = <Props extends object>(
  dataName: string,
  fetchFunction: (props: Props) => any,
  shouldCallEffect: (props: Props) => any[],
) => (BaseComponent: React.ComponentType<Props>) => (props: Props) => {
  // Initial state
  let [state, setState] = useState({
    loading: true,
    error: false,
    data: null,
  });

  // Fetch effect
  useEffect(() => {
    if (state.loading) {
      let effect = async () => {
        try {
          let response = await fetchFunction(props);
          setState({
            loading: false,
            error: false,
            data: response.body,
          });
        } catch (e) {
          setState({
            loading: false,
            error: true,
            data: null,
          });
        }
      };
      effect();
    }
  }, shouldCallEffect(props));

  // Gather fetched component props
  let componentProps = {
    [dataName]: state.data,
  };

  return (
    <>
      {state.loading ? (
        <Style.Loader src={Loader} alt="Loading..." />
      ) : state.error ? (
        <Style.ErrorMessage>
          <FormattedMessage id="error.loading" />
        </Style.ErrorMessage>
      ) : (
        state.data && <BaseComponent {...props} {...componentProps} />
      )}
    </>
  );
};

export default withDataFetching;
