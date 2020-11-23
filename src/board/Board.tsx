import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { rollDices } from '@actions/dices';
import { getExistingGame } from '@actions/game';
// components
import Loader from '@board/Loader';
import DicesContainer from '@modules/dices/DicesContainer';
import Game from '@modules/game/Game';
import GameHistoryContainer from '@modules/game_history/GameHistoryContainer';
import HomePage from '@modules/home_page/HomePage';
import PlayerContainer from '@modules/players/PlayerContainer';
import SwalManager from '@modules/swals/SwalManager';
// types
import { CatanState } from '@core/types';

import './Board.css';

const Board = () => {
  const dispatch = useDispatch();

  const game = useSelector((state: CatanState) => state.game);
  const listenToShortcuts = useSelector((state: CatanState) => state.listenToShortcuts);
  
  const { loading, paused } = game;

  useEffect(() => {
    dispatch(getExistingGame())
  }, []);

  return (
    <div
      className="catan-game"
      onKeyUp={e => {
        if (listenToShortcuts && e.keyCode === 32) dispatch(rollDices());
      }}
      tabIndex={0}
    >
      <HomePage />
      {loading && <Loader />}
      {!paused && !loading && (
        <>
          <SwalManager />
          <Game />
          <GameHistoryContainer />
          <PlayerContainer />
          <DicesContainer />
        </>
      )}
    </div>
  );
};

export default Board;
