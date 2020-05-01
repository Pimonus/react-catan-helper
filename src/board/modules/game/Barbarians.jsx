/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import type { CatanState } from '../../../flow';
import './Barbarians.css';

type StateProps = {
  +position: number,
};

type Props = StateProps;

const mapStateToProps = (state: CatanState): StateProps => ({
  position: state.barbarians.position,
});

const BarbariansContainer = (props: Props) => {
  const { position } = props;

  return (
    <div className="barbarians-container">
      <div
        className={cn('step', {
          overtaken: position > 0,
          current: position === 0,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 1,
          current: position === 1,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 2,
          current: position === 2,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 3,
          current: position === 3,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 4,
          current: position === 4,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 5,
          current: position === 5,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 6,
          current: position === 6,
        })}
      />
      <div className="step attack" />
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(BarbariansContainer);
