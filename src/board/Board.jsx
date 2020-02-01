/* @flow */

import React, { useEffect } from 'react';
import { Route /*, Link */ } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames';

import { rollDices } from '../redux/actions/dices';
import { getExistingGame } from '../redux/actions/game';
import About from './About.jsx';
import Loader from './Loader.jsx';
import DicesContainer from './modules/dices/DicesContainer.jsx';
import Game from './modules/game/Game.jsx';
import HomePage from './modules/home_page/HomePage.jsx';
import PlayerContainer from './modules/players/PlayerContainer.jsx';
import SwalManager from './modules/swals/SwalManager';

import type { CatanState, Dispatch, GameState } from '../flow';

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
      <main>
        <Route exact path="/about-us" component={About} />
      </main>
      <Game pausedGame={paused || loading} />
      <HomePage />
      {loading ? <Loader /> : null}
      <PlayerContainer pausedGame={paused || loading} />
      <SwalManager />
      <div
        className={cn('board', {
          hidden: paused || loading,
        })}
      >
        <DicesContainer pausedGame={paused || loading} />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
