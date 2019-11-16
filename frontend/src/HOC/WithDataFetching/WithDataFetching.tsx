import React, { useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import Loader from '../../assets/loader.svg';

import Style from './WithDataFetching.style';

import { normalize } from 'redux/Pokemon';

const withDataFetching = <Props extends object>(
  dataName: string,
  fetchFunction: (props: Props) => any,
  shouldCallEffect: (props: Props) => any[],
  successFunction: (props: Props, data: any) => void,
) => (BaseComponent: React.ComponentType<Props>) => (props: Props) => {
  // Initial state
  let [loading, setLoading] = useState<boolean>(true);
  let [error, setError] = useState<boolean>(false);

  // Fetch effect
  useEffect(() => {
    let effect = async () => {
      setLoading(true);
      try {
        let response = await fetchFunction(props);
        successFunction(props, normalize(response.body));
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    effect();
  }, shouldCallEffect(props));

  return (
    <>
      {loading ? (
        <Style.Wrapper>
          <Style.Loader src={Loader} alt="Loading..." />
        </Style.Wrapper>
      ) : error ? (
        <Style.Wrapper>
          <Style.ErrorMessage>
            <FormattedMessage id="error.loading" />
          </Style.ErrorMessage>
        </Style.Wrapper>
      ) : (
        <BaseComponent {...props} />
      )}
    </>
  );
};

export default withDataFetching;
