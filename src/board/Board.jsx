/* @flow */

import React, { PureComponent } from 'react';
import { Route /*, Link */ } from 'react-router-dom';
import { connect } from 'react-redux';

import About from './About.jsx';
import Loader from './Loader.jsx';
import BarbariansContainer from './modules/barbarians/BarbariansContainer.jsx';
import DicesContainer from './modules/dices/DicesContainer.jsx';
import GameMenu from './modules/menu/GameMenu.jsx';
import HomePage from './modules/home_page/HomePage.jsx';
import PlayerContainer from './modules/players/PlayerContainer.jsx';
import type { CatanState, GameState, Player } from '../flow';
import './Board.css';

type StateProps = {
  +game: GameState,
  +players: $ReadOnlyArray<Player>,
};
type Props = StateProps;

const mapStateToProps = (state: CatanState): StateProps => ({
  game: state.game,
  players: state.players,
});

class Board extends PureComponent<Props> {
  render() {
    const { loading, paused } = this.props.game;

    return (
      <div className="catan-board" onKeyDown={e => console.log(e)} tabIndex={0}>
        {/* <header>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
      </header> */}
        <main>
          <Route exact path="/about-us" component={About} />
        </main>
        <HomePage />
        {loading ? <Loader /> : null}
        {/* <GameMenu pausedGame={paused || loading} /> */}
        <PlayerContainer pausedGame={paused || loading} />
        <DicesContainer pausedGame={paused || loading} />
        {/* <BarbariansContainer pausedGame={paused || loading} /> */}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Board);
