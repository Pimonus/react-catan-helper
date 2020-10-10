/** @flow */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { newGame, resumeGame } from '@actions/game';
import type { CatanState, Dispatch, GameState } from '@flow';
import catanLogo from '@images/catan_logo.png';

import './HomePage.css';

type StateProps = {
  +availableGame: boolean,
  +game: GameState,
};

type DispatchProps = {
  +newGame: () => any,
  +resumeGame: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  availableGame: state.availableGame,
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  newGame: () => dispatch(newGame()),
  resumeGame: () => dispatch(resumeGame()),
});

type Props = StateProps & DispatchProps;

const HomePage = (props: Props) => {
  const { availableGame, game } = props;

  return (
    <div className={cn('homepage', { visible: game.paused })}>
      <img src={catanLogo} alt="Catan" />
      {availableGame ? <h1 onClick={props.resumeGame}>Reprendre la dernière partie</h1> : null}
      <h1 onClick={props.newGame}>Nouvelle partie</h1>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
