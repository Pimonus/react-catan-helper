/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import type { CatanState } from '../../../flow';
// import barbariansPath from '../../../assets/images/barbarians_path.png';
import './Barbarians.css';

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

const BarbariansContainer = (props: Props) => (
  <div
    className={cn('barbarians-container', {
      hidden: props.pausedGame,
    })}
  >
    {/* <img className="barbarians-path" src={barbariansPath} /> */}
  </div>
);

export default connect(
  mapStateToProps,
  null
)(BarbariansContainer);
