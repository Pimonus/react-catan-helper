/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// actions
import { disableShortcuts, enableThief } from '../../../redux/actions/game';
import { dismissSwal, fireSwal } from '../../../redux/actions/swal';
// components
import ThiefSwal from './ThiefSwal';
// helpers
import { getDicesScore, THIEF_SCORE } from '../../../core';
// types
import type {
  CatanState,
  DicesState,
  Dispatch,
  GameState,
} from '../../../flow';

import './SwalManager.css';

const swal = withReactContent(Swal);
const swalDelay = 2000;
const swalTimmer = 5000;

const dicesHaveBeenRevealed = (flipped: boolean, stillFlipped: boolean) =>
  flipped && !stillFlipped;

type StateProps = {
  +_createdAt: Date,
  +dices: DicesState,
  +game: GameState,
};

type DispatchProps = {
  +disableShortcuts: () => any,
  +dismissSwal: () => any,
  +enableThief: () => any,
  +fireSwal: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  _createdAt: state._createdAt,
  dices: state.dices,
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  disableShortcuts: () => dispatch(disableShortcuts()),
  dismissSwal: () => dispatch(dismissSwal()),
  enableThief: () => dispatch(enableThief()),
  fireSwal: () => dispatch(fireSwal()),
});

type Props = StateProps & DispatchProps;

class SwalManager extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { dices: prevDices, game } = prevProps;
    const thiefWasNotEnabled = !game.enabledThief;
    const { dices } = this.props;
    if (
      prevProps._createdAt === this.props._createdAt &&
      dicesHaveBeenRevealed(prevDices.flipped, dices.flipped)
    ) {
      if (thiefWasNotEnabled && getDicesScore(dices.values) === THIEF_SCORE)
        this.fire(
          {
            timer: swalTimmer,
            showConfirmButton: false,
            html: <ThiefSwal />,
          },
          () => this.props.enableThief()
        );
    }
  }

  fire(swalParams: { [key: string]: any }, callback: () => any) {
    this.props.disableShortcuts();
    setTimeout(() => this.props.fireSwal(), swalDelay);
    setTimeout(() => swal.fire(swalParams), swalDelay);
    setTimeout(() => callback(), swalDelay + swalTimmer);
  }

  render = () => null;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwalManager);
