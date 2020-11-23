import React from 'react';

import thief from '@images/brigand.png';

import './ThiefSwall.css';

const ThiefSwal = () => {
  return (
    <div className="thief-swal">
      <img src={thief} alt="This is a vilain thief" />
      <p>Le voleur entre en jeu !</p>
    </div>
  );
};

export default ThiefSwal;
