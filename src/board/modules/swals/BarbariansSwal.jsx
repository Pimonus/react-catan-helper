/** @flow */

import React from 'react';

import barbarians from '@images/barbarians.png';

import './BarbariansSwal.css';

type Props = {
  +progress?: boolean,
};

const BarbariansSwal = (props: Props) => {
  return (
    <div className="barbarians-swal">
      <img src={barbarians} alt="Vilain barbarians" />
      <p>{props.progress ? 'Les barbares avancent !' : 'Les barbares attaquent !'}</p>
    </div>
  );
};

export default BarbariansSwal;
