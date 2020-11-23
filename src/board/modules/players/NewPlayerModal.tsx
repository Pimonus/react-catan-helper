import React, { useState } from 'react';

import './NewPlayerModal.css';

interface Props {
  cancel: () => any;
  submitAndClose: (nickname: string) => any;
};

const NewPlayerModal = ({ cancel, submitAndClose }: Props) => {
  const [nickname, setNickname] = useState('');

  return (
    <div className="new-player modal">
      <form className="container">
        <div className="cancel-cross" onClick={cancel}></div>
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
          onClick={() => submitAndClose(nickname)}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default NewPlayerModal;
