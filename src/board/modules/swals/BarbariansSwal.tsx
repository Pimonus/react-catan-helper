import React, { useState } from 'react';

import useMount from '@hooks/useMount';
import barbarians from '@images/barbarians.png';

import './BarbariansSwal.less';

interface Props {
  attack?: boolean;
}

const BarbariansSwal = ({ attack }: Props) => {
  const [imgLoaded, setImageLoaded] = useState(false);

  useMount(() => {
    const image = new Image();
    image.onload = () => setImageLoaded(true);
    image.src = barbarians;
  });

  if (!imgLoaded) return <div className="barbarians-swal" />;

  return (
    <div className="barbarians-swal">
      {<img src={barbarians} alt="Vilain barbarians" />}
      <p>{attack ? 'Les barbares attaquent !' : 'Les barbares avancent !'}</p>
    </div>
  );
};

export default BarbariansSwal;
