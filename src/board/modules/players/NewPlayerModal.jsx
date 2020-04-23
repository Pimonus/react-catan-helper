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
      <form className="container">
        <div className="cancel-cross" onClick={props.cancel}></div>
        <h1>Comment s'appelle votre nouveau joueur ?</h1>
        <input
          autoFocus
          type="text"
          value={nickname}
          onChange={event => setNickname(event.target.value)}
        />
        <button
          type="submit"
          disabled={nickname === ''}
          onClick={() => props.submitAndClose(nickname)}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default NewPlayerModal;
