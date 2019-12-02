/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import ThiefSwal from './ThiefSwal';
import { dismissSwal, fireSwal } from '../../../redux/actions/swal';
import type { CatanState, Dispatch } from '../../../flow';

import './SwalManager.css';

const swal = withReactContent(Swal);

type StateProps = {
  +_createdAt: Date,
  +enabledThief: boolean,
};

type DispatchProps = {
  +dismissSwal: () => any,
  +fireSwal: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  _createdAt: state._createdAt,
  enabledThief: state.game.enabledThief,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dismissSwal: () => dispatch(dismissSwal()),
  fireSwal: () => dispatch(fireSwal()),
});

type Props = StateProps & DispatchProps;

class SwalManager extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    if (prevProps._createdAt === this.props._createdAt) {
      if (!prevProps.enabledThief && this.props.enabledThief)
        this.fire({
          timer: 3000,
          showConfirmButton: false,
          html: <ThiefSwal />,
        });
    }
  }

  fire(params: { [key: string]: any }) {
    this.props.fireSwal();
    swal.fire(params);
    this.props.dismissSwal();
  }

  render = () => null;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwalManager);
