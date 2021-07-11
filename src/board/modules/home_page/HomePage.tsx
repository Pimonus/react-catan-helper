import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import gameActions from '@actions/game';
import { CatanState } from '@core/types';
import catanLogo from '@images/catan_logo.png';

import './HomePage.less';

const HomePage = () => {
  const dispatch = useDispatch();

  const availableGame = useSelector((state: CatanState) => state.availableGame);
  const game = useSelector((state: CatanState) => state.game);

  return (
    <div className={cn('homepage', { visible: game.paused })}>
      <img src={catanLogo} alt="Catan" />
      {availableGame && (
        <h1 onClick={() => dispatch(gameActions.resumeGame)}>Reprendre la dernière partie</h1>
      )}
      <h1 onClick={() => dispatch(gameActions.newGame)}>Nouvelle partie</h1>
    </div>
  );
};

export default HomePage;
