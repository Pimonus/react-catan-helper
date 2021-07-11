import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// hooks
import useMount from '@hooks/useMount';
// actions
import { rollDices } from '@actions/dices';
import gameActions from '@actions/game';
// components
import Loader from '@board/Loader';
import DicesContainer from '@modules/dices/DicesContainer';
import Game from '@modules/game/Game';
import GameHistoryContainer from '@modules/game_history/GameHistoryContainer';
import GameStatsContainer from '@modules/game_stats/GameStatsContainer';
import HomePage from '@modules/home_page/HomePage';
import Menu from '@modules/menu/Menu';
import PlayerContainer from '@modules/players/PlayerContainer';
import PlayerFactory from '@modules/players/PlayerFactory';
import SwalManager from '@modules/swals/SwalManager';
// types
import { CatanState } from '@core/types';

import './Board.less';

const Board = () => {
  const dispatch = useDispatch();

  const game = useSelector((state: CatanState) => state.game);
  const listenToShortcuts = useSelector((state: CatanState) => state.listenToShortcuts);

  const { loading, paused, showStats, started } = game;

  useMount(() => dispatch(gameActions.scanExistingGame));

  return (
    <section
      className="board"
      onKeyUp={e => {
        if (listenToShortcuts && e.keyCode === 32) dispatch(rollDices);
      }}
      tabIndex={0}
    >
      {paused && <HomePage />}
      {loading && <Loader />}
      {showStats && <GameStatsContainer />}
      {!paused && !loading && !showStats && (
        <>
          {started ? (
            <>
              <Menu />
              <SwalManager />
              <aside>
                <PlayerContainer />
              </aside>
              <div className="main-content">
                <DicesContainer />
                <GameHistoryContainer />
              </div>
              <aside>
                <Game />
              </aside>
            </>
          ) : (
            <PlayerFactory />
          )}
        </>
      )}
    </section>
  );
};

export default Board;
