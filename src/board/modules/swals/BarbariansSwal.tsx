import React from 'react';

import barbarians from '@images/barbarians.png';

import './BarbariansSwal.css';

interface Props {
  attack?: boolean;
}

const BarbariansSwal = ({ attack }: Props) => {
  return (
    <div className="barbarians-swal">
      <img src={barbarians} alt="Vilain barbarians" />
      <p>{attack ? 'Les barbares attaquent !' : 'Les barbares avancent !'}</p>
    </div>
  );
};

export default BarbariansSwal;
