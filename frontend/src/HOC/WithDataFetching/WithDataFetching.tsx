import React, { useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import Loader from '../../assets/loader.svg';

import Style from './WithDataFetching.style';

const withDataFetching = <Props extends object>(
  dataName: string,
  fetchFunction: (props: Props) => any,
  shouldCallEffect: (props: Props) => any[],
) => (BaseComponent: React.ComponentType<Props>) => (props: Props) => {
  // Initial state
  let [loading] = useState<boolean>(false);
  let [error] = useState<boolean>(false);

  // Fetch effect
  useEffect(() => {
    fetchFunction(props);
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
