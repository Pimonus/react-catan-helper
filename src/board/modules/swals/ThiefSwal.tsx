import React, { useState } from 'react';

import useMount from '@hooks/useMount';
import thief from '@images/brigand.png';

import './ThiefSwall.less';

const ThiefSwal = () => {
  const [imgLoaded, setImageLoaded] = useState(false);

  useMount(() => {
    const image = new Image();
    image.onload = () => setImageLoaded(true);
    image.src = thief;
  });

  if (!imgLoaded) return <div className="barbarians-swal" />;
  return (
    <div className="thief-swal">
      <img src={thief} alt="This is a vilain thief" />
      <p>Le voleur entre en jeu !</p>
    </div>
  );
};

export default ThiefSwal;
