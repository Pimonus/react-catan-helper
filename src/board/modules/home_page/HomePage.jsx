/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { resumeGame } from '../../../redux/actions/game';
import type { CatanState, Dispatch, GameState } from '../../../flow';

import catanLogo from '../../../assets/images/catan_logo.png';

import './HomePage.css';

type StateProps = {
  +game: GameState,
};

type DispatchProps = {
  +resume: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  resume: () => dispatch(resumeGame()),
});

type Props = StateProps & DispatchProps;

const HomePage = (props: Props) => {
  const { game } = props;
  return (
    <div className={cn('homepage', { visible: game.paused })}>
      <img src={catanLogo} alt="Catan" />
      <h1 onClick={props.resume}>Reprendre la dernière partie</h1>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
