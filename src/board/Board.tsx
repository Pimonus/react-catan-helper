import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';

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
import HomePage from '@modules/home_page/HomePage';
import PlayerContainer from '@modules/players/PlayerContainer';
import PlayerFactory from '@modules/players/PlayerFactory';
import SwalManager from '@modules/swals/SwalManager';
// types
import { CatanState } from '@core/types';

import './Board.css';

const { Sider, Content } = Layout;

const Board = () => {
  const dispatch = useDispatch();

  const game = useSelector((state: CatanState) => state.game);
  const listenToShortcuts = useSelector((state: CatanState) => state.listenToShortcuts);

  const { loading, paused, started } = game;

  useMount(() => dispatch(gameActions.scanExistingGame));

  return (
    <Layout
      className="board"
      onKeyUp={e => {
        if (listenToShortcuts && e.keyCode === 32) dispatch(rollDices);
      }}
      tabIndex={0}
    >
      {paused && <HomePage />}
      {loading && <Loader />}
      {!paused && !loading && (
        <>
          {started ? (
            <>
              <Sider width="20vw">
                <PlayerContainer />
              </Sider>
              <Layout>
                <Content className="main-content">
                  <DicesContainer />
                  <GameHistoryContainer />
                </Content>
              </Layout>
              <Sider width="20vw">
                <Game />
              </Sider>
              <SwalManager />
            </>
          ) : (
            <PlayerFactory />
          )}
        </>
      )}
    </Layout>
  );
};

export default Board;
