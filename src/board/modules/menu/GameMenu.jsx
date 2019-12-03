/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Tooltip from 'react-tooltip';
import cn from 'classnames';

import type { CatanState } from '../../../flow';
import thiefIcon from '../../../assets/images/brigand.png';
import './GameMenu.css';

type OwnProps = {
  +pausedGame: boolean,
};

type StateProps = {
  +enabledThief: boolean,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  enabledThief: state.game.enabledThief,
});

type Props = OwnProps & StateProps;

const GameMenu = (props: Props) => {
  const { enabledThief } = props;

  return (
    <div
      className={cn('menu-container', {
        hidden: props.pausedGame,
      })}
    >
      {enabledThief ? (
        <>
          <img
            className="thief-icon"
            src={thiefIcon}
            data-tip="React-tooltip"
          />
          <Tooltip className="tooltip" place="left" type="dark" effect="solid">
            Le Voleur est activé (héhé)
          </Tooltip>
        </>
      ) : null}
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(GameMenu);
