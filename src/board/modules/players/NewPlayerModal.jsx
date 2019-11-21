/* @flow */

import React, { useState } from 'react';

import './NewPlayerModal.css';

type OwnProps = {
  +cancel: () => any,
  +submitAndClose: (nickname: string) => any,
};

const NewPlayerModal = (props: OwnProps) => {
  const [nickname, setNickname] = useState('');

  return (
    <div className="new-player modal">
      <div className="container">
        <div className="cancel-cross" onClick={props.cancel}></div>
        <h1>Nouveau Joueur</h1>
        <p>Comment s'appelle votre nouveau participant ?</p>
        <input
          autoFocus
          type="text"
          value={nickname}
          onChange={event => setNickname(event.target.value)}
        />
        <button
          disabled={nickname === ''}
          onClick={() => props.submitAndClose(nickname)}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default NewPlayerModal;
