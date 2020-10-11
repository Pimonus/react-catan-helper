/** @flow */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { rollDices } from '@actions/dices';
import { getExistingGame } from '@actions/game';
import Loader from '@board/Loader.jsx';
import DicesContainer from '@modules/dices/DicesContainer.jsx';
import Game from '@modules/game/Game.jsx';
import GameHistoryContainer from '@modules/game_history/GameHistoryContainer.jsx';
import HomePage from '@modules/home_page/HomePage.jsx';
import PlayerContainer from '@modules/players/PlayerContainer.jsx';
import SwalManager from '@modules/swals/SwalManager';

import type { CatanState, Dispatch, GameState } from '@flow';

import './Board.css';

type StateProps = {
  +game: GameState,
  +listenToShortcuts: boolean,
};

type DispatchProps = {
  +getExistingGame: () => any,
  +rollDices: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  game: state.game,
  listenToShortcuts: state.listenToShortcuts,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getExistingGame: () => dispatch(getExistingGame()),
  rollDices: () => dispatch(rollDices()),
});

type Props = StateProps & DispatchProps;

const Board = (props: Props) => {
  const { game, getExistingGame, listenToShortcuts, rollDices } = props;
  const { loading, paused } = game;

  useEffect(() => getExistingGame(), []);

  return (
    <div
      className="catan-game"
      onKeyUp={e => {
        if (listenToShortcuts && e.keyCode === 32) rollDices();
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
