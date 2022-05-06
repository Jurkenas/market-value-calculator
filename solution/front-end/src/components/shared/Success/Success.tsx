/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import Button from '../Input/Button/Button';
import { MarketValueData } from '../../Pages/MarketValueCalculatorPage/MarketValueCalculatorPage';

interface SuccessProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (e: React.FormEvent) => void;
  data: MarketValueData;
}

function Success({ onSubmit, data }: SuccessProps) {
  return (
    <>
      <h2>Apskaičiuota!</h2>
      <h2>
        Vidutinė rinkos kaina:&nbsp;
        <strong>{data.averagePrice}</strong>
        &nbsp;Eur
      </h2>
      <h2>{`${data.searchParams.make} ${data.searchParams.model}`}</h2>
      <h2>{`${data.searchParams.yearFrom}-${data.searchParams.yearTo}`}</h2>
      {data.searchParams.fuel ? <h2>{data.searchParams.fuel}</h2> : null}
      {data.searchParams.bodyType ? <h2>{data.searchParams.bodyType}</h2> : null}
      {data.searchParams.gearBox ? <h2>{data.searchParams.gearBox}</h2> : null}
    </>
  );
}

export default Success;
