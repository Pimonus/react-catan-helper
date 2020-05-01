/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// actions
import {
  moveBarbariansForward,
  resistBarbariansAttack,
} from '../../../redux/actions/barbarians';
import { disableShortcuts, enableThief } from '../../../redux/actions/game';
import { dismissSwal, fireSwal } from '../../../redux/actions/swal';
// components
import BarbariansSwal from './BarbariansSwal';
import ThiefSwal from './ThiefSwal';
// helpers
import {
  didBarbariansProgress,
  didBarbariansReachCoast,
  getDicesScore,
  THIEF_SCORE,
} from '../../../core';
// types
import type {
  BarbariansState,
  CatanState,
  DicesState,
  Dispatch,
  GameState,
} from '../../../flow';

import './SwalManager.css';

const swal = withReactContent(Swal);
const swalDelay = 2000;
const swalTimmer = 5000;

type SwalWithCallback = {
  +swal: {
    timer: number,
    showConfirmButton: boolean,
    html: any,
  },
  +callback: () => any,
};

const dicesHaveBeenRevealed = (flipped: boolean, stillFlipped: boolean) =>
  flipped && !stillFlipped;

type StateProps = {
  +_createdAt: Date,
  +barbarians: BarbariansState,
  +dices: DicesState,
  +game: GameState,
};

type DispatchProps = {
  +disableShortcuts: () => any,
  +dismissSwal: () => any,
  +enableThief: () => any,
  +fireSwal: () => any,
  +moveBarbariansForward: () => any,
  +resistBarbariansAttack: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  _createdAt: state._createdAt,
  barbarians: state.barbarians,
  dices: state.dices,
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  disableShortcuts: () => dispatch(disableShortcuts()),
  dismissSwal: () => dispatch(dismissSwal()),
  enableThief: () => dispatch(enableThief()),
  fireSwal: () => dispatch(fireSwal()),
  moveBarbariansForward: () => dispatch(moveBarbariansForward()),
  resistBarbariansAttack: () => dispatch(resistBarbariansAttack()),
});

type Props = StateProps & DispatchProps;

class SwalManager extends PureComponent<Props> {
  async componentDidUpdate(prevProps: Props) {
    const { dices: prevDices, game } = prevProps;
    const { barbarians, dices } = this.props;
    const thiefWasNotEnabled = !game.enabledThief;

    if (
      prevProps._createdAt === this.props._createdAt &&
      dicesHaveBeenRevealed(prevDices.flipped, dices.flipped)
    ) {
      const dicesScore = getDicesScore(dices.values);
      const swalQueue: SwalWithCallback[] = [];

      // Enabled thief swal
      if (thiefWasNotEnabled && dicesScore === THIEF_SCORE)
        swalQueue.push({
          swal: {
            timer: swalTimmer,
            showConfirmButton: false,
            html: <ThiefSwal />,
          },
          callback: () => this.props.enableThief(),
        });

      // Barbarians progress swal
      if (didBarbariansProgress(dices.values)) {
        if (didBarbariansReachCoast(barbarians.position))
          swalQueue.push({
            swal: {
              timer: swalTimmer,
              showConfirmButton: false,
              html: <BarbariansSwal />,
            },
            callback: () => this.props.resistBarbariansAttack(),
          });
        else
          swalQueue.push({
            swal: {
              timer: swalTimmer,
              showConfirmButton: false,
              html: <BarbariansSwal progress />,
            },
            callback: () => this.props.moveBarbariansForward(),
          });
      }

      if (swalQueue.length > 0) await this.processSwalQueue(swalQueue);
    }
  }

  async processSwalQueue(swalQueue: SwalWithCallback[]) {
    this.props.disableShortcuts();
    await new Promise(r => setTimeout(r, swalDelay));
    this.props.fireSwal();
    await swalQueue.reduce(async (previous, item) => {
      await previous;
      await swal.fire(item.swal);
      item.callback();
    }, Promise.resolve());
  }

  render = () => null;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwalManager);
