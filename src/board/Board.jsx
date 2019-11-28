/* @flow */

import React, { PureComponent } from 'react';
import { Route /*, Link */ } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames';

import { rollDices } from '../redux/actions/dices';
import { getExistingGame } from '../redux/actions/game';
import About from './About.jsx';
import Loader from './Loader.jsx';
import BarbariansContainer from './modules/barbarians/BarbariansContainer.jsx';
import DicesContainer from './modules/dices/DicesContainer.jsx';
import GameMenu from './modules/menu/GameMenu.jsx';
import HomePage from './modules/home_page/HomePage.jsx';
import PlayerContainer from './modules/players/PlayerContainer.jsx';

import type { CatanState, Dispatch, GameState, Player } from '../flow';

import './Board.css';

type StateProps = {
  +game: GameState,
  +listenToShortcuts: boolean,
  +players: $ReadOnlyArray<Player>,
};

type DispatchProps = {
  +getExistingGame: () => boolean,
  +rollDices: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  game: state.game,
  listenToShortcuts: state.listenToShortcuts,
  players: state.players,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getExistingGame: () => dispatch(getExistingGame()),
  rollDices: () => dispatch(rollDices()),
});

type Props = StateProps & DispatchProps;

class Board extends PureComponent<Props> {
  componentDidMount = () => {
    this.props.getExistingGame();
  };

  render() {
    const { game, listenToShortcuts } = this.props;
    const { loading, paused } = game;

    return (
      <div
        className="catan-game"
        onKeyUp={e => {
          if (listenToShortcuts && e.keyCode === 32) this.props.rollDices();
        }}
        tabIndex={0}
      >
        <main>
          <Route exact path="/about-us" component={About} />
        </main>
        <HomePage />
        {loading ? <Loader /> : null}
        <PlayerContainer pausedGame={paused || loading} />
        <div
          className={cn('board', {
            hidden: paused || loading,
          })}
        >
          <DicesContainer pausedGame={paused || loading} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
