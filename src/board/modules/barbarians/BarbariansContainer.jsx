/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import type { CatanState } from '../../../flow';

import './BarbariansContainer.css';

type OwnProps = {
  +pausedGame: boolean,
};

type StateProps = {
  +position: number,
};

type Props = OwnProps & StateProps;

const mapStateToProps = (state: CatanState): StateProps => ({
  position: state.barbarians.position,
});

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//   addNewPlayer: nickname => dispatch(addNewPlayer(nickname)),
//   selectPlayer: playerUuid => dispatch(selectPlayer(playerUuid)),
//   deselectPlayer: () => dispatch(deselectPlayer()),
//   addVictoryPoint: playerUuid => dispatch(addVictoryPoint(playerUuid)),
//   attributeLongestRoad: playerUuid =>
//     dispatch(attributeLongestRoad(playerUuid)),
//   attributeStrongestArmy: playerUuid =>
//     dispatch(attributeStrongestArmy(playerUuid)),
// });

const BarbariansContainer = (props: Props) => (
  <div
    className={cn('barbarians-container', {
      hidden: props.pausedGame,
    })}
  >
    <p>{`Position des barbares : ${props.position}`}</p>
    <p>{`Avant attaque : `}</p>
  </div>
);

export default connect(
  mapStateToProps,
  null
)(BarbariansContainer);
