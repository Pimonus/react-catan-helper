/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Tooltip from 'react-tooltip';

import Barbarians from './Barbarians';
import type { CatanState } from '../../../flow';
import thiefIcon from '../../../assets/images/brigand.png';
import './Game.css';

type StateProps = {
  +enabledThief: boolean,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  enabledThief: state.game.enabledThief,
});

type Props = StateProps;

const GameMenu = (props: Props) => {
  const { enabledThief } = props;

  return (
    <div className="game-container">
      {enabledThief ? (
        <>
          <img
            className="thief-icon"
            src={thiefIcon}
            data-tip="React-tooltip"
            alt="Bad thief!"
          />
          <Tooltip className="tooltip" place="left" type="dark" effect="solid">
            Le Voleur est activé (héhé)
          </Tooltip>
        </>
      ) : null}
      <Barbarians />
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(GameMenu);
