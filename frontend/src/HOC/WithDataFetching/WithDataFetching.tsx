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
  let [loading, setLoading] = useState<boolean>(true);
  let [error, setError] = useState<boolean>(false);
  let [data, setData] = useState<any>(null);

  // Fetch effect
  useEffect(() => {
    let effect = async () => {
      setLoading(true);
      try {
        let response = await fetchFunction(props);
        setData(response.body);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    effect();
  }, shouldCallEffect(props));

  // Gather fetched component props
  let componentProps = {
    [dataName]: data,
  };

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
        data && <BaseComponent {...props} {...componentProps} />
      )}
    </>
  );
};

export default withDataFetching;
