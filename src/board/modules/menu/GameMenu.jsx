/* @flow */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './GameMenu.css';

type OwnProps = {
  +pausedGame: boolean,
};

type Props = OwnProps;

const GameMenu = (props: Props) => {
  return (
    <div
      className={cn('menu-container', {
        hidden: props.pausedGame,
      })}
    >
      <div className="burger" />
    </div>
  );
};

export default connect(
  null,
  null
)(GameMenu);
